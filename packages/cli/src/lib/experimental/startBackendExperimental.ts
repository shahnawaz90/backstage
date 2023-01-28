/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BackendServeOptions } from '../bundler/types';
import type { ChildProcess } from 'child_process';
import { fileURLToPath } from 'url';
import { constants as osConstants } from 'os';
import path from 'path';
import { watch } from 'chokidar';
import { run, clearScreen, debounce, isDependencyPath } from './utils';
import { ChannelServer } from './ChannelServer';
import { ServerDataStore } from './ServerDataStore';

export async function startBackendExperimental(options: BackendServeOptions) {
  const envEnv = process.env as { NODE_ENV: string };
  if (!envEnv.NODE_ENV) {
    envEnv.NODE_ENV = 'development';
  }

  const server = new ChannelServer();

  ServerDataStore.bind(server);

  const args = ['src/index.ts'];

  // do the stuff
  console.log('starting');

  let runProcess: ChildProcess | undefined;

  const reRun = debounce(async () => {
    if (runProcess && !runProcess.killed && runProcess.exitCode === null) {
      const waitPromise = new Promise(resolve => {
        console.log('waiting for exit');
        runProcess!.addListener('exit', resolve);
      });
      runProcess.kill();
      await waitPromise;
      console.log('exit complete');
    }

    // Not first run
    if (runProcess) {
      console.log('rerunning');
    }

    // process.stdout.write(clearScreen);

    runProcess = run(args, {
      noCache: false,
      tsconfigPath: '/Users/patriko/dev/backstage/tsconfig.json',
    });

    server.addChild(runProcess);

    runProcess.on('message', data => {
      // Collect run-time dependencies to watch
      if (isDependencyPath(data)) {
        const dependencyPath = data.path.startsWith('file:')
          ? fileURLToPath(data.path)
          : data.path;

        if (path.isAbsolute(dependencyPath)) {
          // console.log('adding', dependencyPath);
          watcher.add(dependencyPath);
        }
      }
    });
  }, 100);

  reRun();

  function exit(signal: NodeJS.Signals) {
    /**
     * In CLI mode where there is only one run, we can inherit the child's exit code.
     * But in watch mode, the exit code should reflect the kill signal.
     */
    process.exit(
      /**
       * https://nodejs.org/api/process.html#exit-codes
       * >128 Signal Exits: If Node.js receives a fatal signal such as SIGKILL or SIGHUP,
       * then its exit code will be 128 plus the value of the signal code. This is a
       * standard POSIX practice, since exit codes are defined to be 7-bit integers, and
       * signal exits set the high-order bit, and then contain the value of the signal
       * code. For example, signal SIGABRT has value 6, so the expected exit code will be
       * 128 + 6, or 134.
       */
      128 + osConstants.signals[signal],
    );
  }

  function relaySignal(signal: NodeJS.Signals) {
    // Child is still running
    if (runProcess && runProcess.exitCode === null) {
      // Wait for child to exit
      runProcess.on('close', () => exit(signal));
      runProcess.kill(signal);
    } else {
      exit(signal);
    }
  }

  process.once('SIGINT', relaySignal);
  process.once('SIGTERM', relaySignal);

  /**
   * Ideally, we can get a list of files loaded from the run above
   * and only watch those files, but it's not possible to detect
   * the full dependency-tree at run-time because they can be hidden
   * in a if-condition/async-delay.
   *
   * As an alternative, we watch cwd and all run-time dependencies
   */
  const watcher = watch(args, {
    cwd: process.cwd(),
    ignoreInitial: true,
    ignored: [
      // Hidden directories like .git
      '**/.*/**',

      // 3rd party packages
      '**/{node_modules,bower_components,vendor}/**',
    ],
    ignorePermissionErrors: true,
  }).on('all', reRun);

  // On "Return" key
  process.stdin.on('data', reRun);

  await new Promise(() => {});
}
