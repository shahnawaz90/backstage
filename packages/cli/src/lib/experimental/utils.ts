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

import type { StdioOptions } from 'child_process';
import { pathToFileURL } from 'url';
import spawn from 'cross-spawn';

const currentTime = () => new Date().toLocaleTimeString();

export const log = (...messages: any[]) =>
  console.log(currentTime(), '[tsx]', ...messages);

// From ansi-escapes
// https://github.com/sindresorhus/ansi-escapes/blob/2b3b59c56ff77a/index.js#L80
export const clearScreen = '\u001Bc';

export function debounce(originalFunction: () => void, duration: number) {
  let timeout: NodeJS.Timeout | undefined;

  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => originalFunction(), duration);
  };
}

export function isDependencyPath(
  data: any,
): data is { type: 'dependency'; path: string } {
  return data && 'type' in data && data.type === 'dependency';
}

export function run(
  argv: string[],
  options?: {
    noCache?: boolean;
    tsconfigPath?: string;
    ipc?: boolean;
  },
) {
  const environment = { ...process.env, BACKSTAGE_CLI_CHANNEL: '1' };
  const stdio: StdioOptions = [
    'inherit', // stdin
    'inherit', // stdout
    'inherit', // stderr
    'ipc', // parent-child communication
  ];

  if (options) {
    if (options.noCache) {
      environment.ESBK_DISABLE_CACHE = '1';
    }

    if (options.tsconfigPath) {
      environment.ESBK_TSCONFIG_PATH = options.tsconfigPath;
    }
  }

  return spawn(
    process.execPath,
    ['--require', require.resolve('@backstage/cli/preflight.cjs'), ...argv],
    {
      stdio,
      env: environment,
    },
  );
}
