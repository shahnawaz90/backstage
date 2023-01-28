/*
 * Copyright 2023 The Backstage Authors
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

// @ts-check

require('@esbuild-kit/cjs-loader');

const sendMessage = process.send?.bind(process);

if (sendMessage && process.env.BACKSTAGE_CLI_CHANNEL) {
  class BackstageCliChannel {
    #messageId = 0;

    async request(method, body) {
      return new Promise((resolve, reject) => {
        const id = this.#messageId++;
        sendMessage(
          { type: '@backstage/cli/channel/request', id, method, body },
          e => {
            if (e) {
              reject(e);
              return;
            }

            const timeout = setTimeout(() => {
              reject(new Error('IPC request timed out'));
            }, 1000);

            const messageHandler = response => {
              if (response?.type !== '@backstage/cli/channel/response') {
                return;
              }
              if (response.id !== id) {
                return;
              }

              if (response.error) {
                const error = new Error(response.error.message);
                if (response.error.name) {
                  error.name = response.error.name;
                }
                reject(error);
              } else {
                resolve(response.body);
              }
              clearTimeout(timeout);
              process.removeListener('message', messageHandler);
            };

            process.addListener('message', messageHandler);
          },
        );
      });
    }
  }

  global[Symbol.for('@backstage/cli/channel')] = new BackstageCliChannel();
  console.log(global[Symbol.for('@backstage/cli/channel')]);
}
