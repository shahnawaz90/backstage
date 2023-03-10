/*
 * Copyright 2021 The Backstage Authors
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

import {
  CacheClient,
  CacheClientSetOptions,
} from '@backstage/backend-plugin-api';
import { JsonValue } from '@backstage/types';
import { createHash } from 'crypto';
import Keyv from 'keyv';

export type {
  CacheClient,
  CacheClientSetOptions,
} from '@backstage/backend-plugin-api';

type CacheClientArgs = {
  client: Keyv;
};

/**
 * A basic, concrete implementation of the CacheClient, suitable for almost
 * all uses in Backstage.
 */
export class DefaultCacheClient implements CacheClient {
  private readonly client: Keyv;

  constructor({ client }: CacheClientArgs) {
    this.client = client;
  }

  async get(key: string): Promise<JsonValue | undefined> {
    const k = this.getNormalizedKey(key);
    return await this.client.get(k);
  }

  async set(
    key: string,
    value: JsonValue,
    opts: CacheClientSetOptions = {},
  ): Promise<void> {
    const k = this.getNormalizedKey(key);
    await this.client.set(k, value, opts.ttl);
  }

  async delete(key: string): Promise<void> {
    const k = this.getNormalizedKey(key);
    await this.client.delete(k);
  }

  /**
   * Ensures keys are well-formed for any/all cache stores.
   */
  private getNormalizedKey(candidateKey: string): string {
    // Remove potentially invalid characters.
    const wellFormedKey = Buffer.from(candidateKey).toString('base64');

    // Memcache in particular doesn't do well with keys > 250 bytes.
    // Padded because a plugin ID is also prepended to the key.
    if (wellFormedKey.length < 200) {
      return wellFormedKey;
    }

    return createHash('md5').update(candidateKey).digest('base64');
  }
}
