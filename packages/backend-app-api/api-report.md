## API Report File for "@backstage/backend-app-api"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { AnyServiceFactory } from '@backstage/backend-plugin-api';
import { BackendFeature } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import { ExtensionPoint } from '@backstage/backend-plugin-api';
import { HttpRouterService } from '@backstage/backend-plugin-api';
import { Logger } from '@backstage/backend-plugin-api';
import { PermissionAuthorizer } from '@backstage/plugin-permission-common';
import { PermissionEvaluator } from '@backstage/plugin-permission-common';
import { PluginCacheManager } from '@backstage/backend-common';
import { PluginDatabaseManager } from '@backstage/backend-common';
import { PluginEndpointDiscovery } from '@backstage/backend-common';
import { PluginTaskScheduler } from '@backstage/backend-tasks';
import { ServiceFactory } from '@backstage/backend-plugin-api';
import { ServiceRef } from '@backstage/backend-plugin-api';
import { TokenManager } from '@backstage/backend-common';
import { UrlReader } from '@backstage/backend-common';

// @public (undocumented)
export interface Backend {
  // (undocumented)
  add(feature: BackendFeature): void;
  // (undocumented)
  start(): Promise<void>;
}

// @public (undocumented)
export const cacheFactory: ServiceFactory<
  PluginCacheManager,
  PluginCacheManager,
  {}
>;

// @public (undocumented)
export const configFactory: ServiceFactory<Config, Config, {}>;

// @public (undocumented)
export function createSpecializedBackend(
  options: CreateSpecializedBackendOptions,
): Backend;

// @public (undocumented)
export interface CreateSpecializedBackendOptions {
  // (undocumented)
  services: AnyServiceFactory[];
}

// @public (undocumented)
export const databaseFactory: ServiceFactory<
  PluginDatabaseManager,
  PluginDatabaseManager,
  {}
>;

// @public (undocumented)
export const discoveryFactory: ServiceFactory<
  PluginEndpointDiscovery,
  PluginEndpointDiscovery,
  {}
>;

// @public (undocumented)
export const httpRouterFactory: ServiceFactory<
  HttpRouterService,
  HttpRouterService,
  {}
>;

// @public (undocumented)
export const loggerFactory: ServiceFactory<Logger, Logger, {}>;

// @public (undocumented)
export const permissionsFactory: ServiceFactory<
  PermissionAuthorizer | PermissionEvaluator,
  PermissionAuthorizer | PermissionEvaluator,
  {}
>;

// @public (undocumented)
export const schedulerFactory: ServiceFactory<
  PluginTaskScheduler,
  PluginTaskScheduler,
  {}
>;

// @public (undocumented)
export type ServiceOrExtensionPoint<T = unknown> =
  | ExtensionPoint<T>
  | ServiceRef<T>;

// @public (undocumented)
export const tokenManagerFactory: ServiceFactory<
  TokenManager,
  TokenManager,
  {}
>;

// @public (undocumented)
export const urlReaderFactory: ServiceFactory<UrlReader, UrlReader, {}>;
```