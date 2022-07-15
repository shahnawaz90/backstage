## API Report File for "@backstage/plugin-catalog-backend-module-aws"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { CatalogProcessor } from '@backstage/plugin-catalog-backend';
import { CatalogProcessorEmit } from '@backstage/plugin-catalog-backend';
import { CatalogProcessorParser } from '@backstage/plugin-catalog-backend';
import { Config } from '@backstage/config';
import { Credentials } from 'aws-sdk';
import { EntityProvider } from '@backstage/plugin-catalog-backend';
import { EntityProviderConnection } from '@backstage/plugin-catalog-backend';
import { LocationSpec } from '@backstage/plugin-catalog-backend';
import { Logger } from 'winston';
import { TaskRunner } from '@backstage/backend-tasks';
import { UrlReader } from '@backstage/backend-common';

// @public
export type AWSCredentialFactory = (
  awsAccountId: string,
) => Promise<Credentials>;

// @public
export class AwsEKSClusterProcessor implements CatalogProcessor {
  constructor(options: { credentialsFactory?: AWSCredentialFactory });
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  normalizeName(name: string): string;
  // (undocumented)
  readLocation(
    location: LocationSpec,
    _optional: boolean,
    emit: CatalogProcessorEmit,
  ): Promise<boolean>;
}

// @public
export class AwsOrganizationCloudAccountProcessor implements CatalogProcessor {
  // (undocumented)
  static fromConfig(
    config: Config,
    options: {
      logger: Logger;
    },
  ): AwsOrganizationCloudAccountProcessor;
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  readLocation(
    location: LocationSpec,
    _optional: boolean,
    emit: CatalogProcessorEmit,
  ): Promise<boolean>;
}

// @public
export class AwsS3DiscoveryProcessor implements CatalogProcessor {
  constructor(reader: UrlReader);
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  readLocation(
    location: LocationSpec,
    optional: boolean,
    emit: CatalogProcessorEmit,
    parser: CatalogProcessorParser,
  ): Promise<boolean>;
}

// @public
export class AwsS3EntityProvider implements EntityProvider {
  // (undocumented)
  connect(connection: EntityProviderConnection): Promise<void>;
  // (undocumented)
  static fromConfig(
    configRoot: Config,
    options: {
      logger: Logger;
      schedule: TaskRunner;
    },
  ): AwsS3EntityProvider[];
  // (undocumented)
  getProviderName(): string;
  // (undocumented)
  refresh(logger: Logger): Promise<void>;
}
```