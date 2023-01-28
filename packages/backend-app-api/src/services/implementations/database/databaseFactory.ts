/*
 * Copyright 2022 The Backstage Authors
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

import { DatabaseManager } from '@backstage/backend-common';
import {
  coreServices,
  createServiceFactory,
} from '@backstage/backend-plugin-api';
import { ConfigReader } from '@backstage/config';
import knex from 'knex';

/** @public */
export const databaseFactory = createServiceFactory({
  service: coreServices.database,
  deps: {
    config: coreServices.config,
    plugin: coreServices.pluginMetadata,
    lifecycle: coreServices.lifecycle,
  },
  async createRootContext({ config }) {
    return config.getOptional('backend.database')
      ? DatabaseManager.fromConfig(config)
      : DatabaseManager.fromConfig(
          new ConfigReader({
            backend: {
              database: { client: 'better-sqlite3', connection: ':memory:' },
            },
          }),
        );
  },
  async factory({ plugin, lifecycle }, databaseManager) {
    const response = await global[Symbol.for('@backstage/cli/channel')].request(
      'ServerDataStore.load',
      { key: `db-${plugin.getId()}` },
    );
    // console.log(`DEBUG: response=`, response);

    let db: any = undefined;

    if (response.loaded && response.data.length) {
      const seedData: Buffer = response.data;

      // console.log(`DEBUG: RESTORING DB`, seedData);
      db = knex({
        client: 'better-sqlite3',
        connection: {
          filename: Buffer.from(seedData, 'base64'),
        },
      });
    } else {
      db = knex({
        client: 'better-sqlite3',
        connection: {
          filename: ':memory:',
        },
      });
    }

    lifecycle.addShutdownHook({
      fn: async () => {
        const connection = await db.client.acquireConnection();
        const data: Buffer = await connection.serialize();
        if (data) {
          console.log(`DEBUG: storing data for ${plugin.getId()}`);
          await global[Symbol.for('@backstage/cli/channel')].request(
            'ServerDataStore.save',
            { key: `db-${plugin.getId()}`, data: data.toString('base64') },
          );
          console.log(`DEBUG: stored data for ${plugin.getId()}`);
        }
      },
    });

    return { getClient: () => db, migrations: true };
  },
});
