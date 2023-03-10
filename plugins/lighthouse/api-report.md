## API Report File for "@backstage/plugin-lighthouse"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { ApiRef } from '@backstage/core-plugin-api';
import { BackstagePlugin } from '@backstage/core-plugin-api';
import { Config } from '@backstage/config';
import { Entity } from '@backstage/catalog-model';
import { InfoCardVariants } from '@backstage/core-components';
import { RouteRef } from '@backstage/core-plugin-api';

// @public (undocumented)
export type Audit = AuditRunning | AuditFailed | AuditCompleted;

// @public (undocumented)
export interface AuditBase {
  // (undocumented)
  id: string;
  // (undocumented)
  timeCreated: string;
  // (undocumented)
  url: string;
}

// @public (undocumented)
export interface AuditCompleted extends AuditBase {
  // (undocumented)
  categories: Record<LighthouseCategoryId, LighthouseCategoryAbbr>;
  // (undocumented)
  report: Object;
  // (undocumented)
  status: 'COMPLETED';
  // (undocumented)
  timeCompleted: string;
}

// @public (undocumented)
export interface AuditFailed extends AuditBase {
  // (undocumented)
  status: 'FAILED';
  // (undocumented)
  timeCompleted: string;
}

// @public (undocumented)
export interface AuditRunning extends AuditBase {
  // (undocumented)
  status: 'RUNNING';
}

// @public (undocumented)
export const EmbeddedRouter: () => JSX.Element;

// @public (undocumented)
export const EntityLastLighthouseAuditCard: (props: {
  dense?: boolean | undefined;
  variant?: InfoCardVariants | undefined;
}) => JSX.Element;

// @public (undocumented)
export const EntityLighthouseContent: () => JSX.Element;

// @public (undocumented)
export class FetchError extends Error {
  // (undocumented)
  static forResponse(resp: Response): Promise<FetchError>;
  // (undocumented)
  get name(): string;
}

// @public (undocumented)
export type FormFactor = 'mobile' | 'desktop';

// @public (undocumented)
const isLighthouseAvailable: (entity: Entity) => boolean;
export { isLighthouseAvailable };
export { isLighthouseAvailable as isPluginApplicableToEntity };

// @public (undocumented)
export interface LASListRequest {
  // (undocumented)
  limit?: number;
  // (undocumented)
  offset?: number;
}

// @public (undocumented)
export interface LASListResponse<Item> {
  // (undocumented)
  items: Item[];
  // (undocumented)
  limit: number;
  // (undocumented)
  offset: number;
  // (undocumented)
  total: number;
}

// @public (undocumented)
export const LastLighthouseAuditCard: (props: {
  dense?: boolean;
  variant?: InfoCardVariants;
}) => JSX.Element;

// @public (undocumented)
export type LighthouseApi = {
  url: string;
  getWebsiteList: (listOptions: LASListRequest) => Promise<WebsiteListResponse>;
  getWebsiteForAuditId: (auditId: string) => Promise<Website>;
  triggerAudit: (payload: TriggerAuditPayload) => Promise<Audit>;
  getWebsiteByUrl: (websiteUrl: string) => Promise<Website>;
};

// @public (undocumented)
export const lighthouseApiRef: ApiRef<LighthouseApi>;

// @public (undocumented)
export interface LighthouseCategoryAbbr {
  // (undocumented)
  id: LighthouseCategoryId;
  // (undocumented)
  score: number;
  // (undocumented)
  title: string;
}

// @public (undocumented)
export type LighthouseCategoryId =
  | 'pwa'
  | 'seo'
  | 'performance'
  | 'accessibility'
  | 'best-practices';

// @public (undocumented)
export type LighthouseConfigSettings = {
  formFactor: FormFactor;
  screenEmulation:
    | {
        mobile: boolean;
        width: number;
        height: number;
        deviceScaleFactor: number;
        disabled: boolean;
      }
    | undefined;
  emulatedFormFactor: FormFactor;
};

// @public (undocumented)
export const LighthousePage: () => JSX.Element;

// @public (undocumented)
const lighthousePlugin: BackstagePlugin<
  {
    root: RouteRef<undefined>;
    entityContent: RouteRef<undefined>;
  },
  {},
  {}
>;
export { lighthousePlugin };
export { lighthousePlugin as plugin };

// @public (undocumented)
export class LighthouseRestApi implements LighthouseApi {
  constructor(url: string);
  // (undocumented)
  static fromConfig(config: Config): LighthouseRestApi;
  // (undocumented)
  getWebsiteByUrl(websiteUrl: string): Promise<Website>;
  // (undocumented)
  getWebsiteForAuditId(auditId: string): Promise<Website>;
  // (undocumented)
  getWebsiteList(options?: LASListRequest): Promise<WebsiteListResponse>;
  // (undocumented)
  triggerAudit(payload: TriggerAuditPayload): Promise<Audit>;
  // (undocumented)
  url: string;
}

// @public (undocumented)
export const Router: () => JSX.Element;

// @public (undocumented)
export interface TriggerAuditPayload {
  // (undocumented)
  options: {
    lighthouseConfig: {
      settings: LighthouseConfigSettings;
    };
  };
  // (undocumented)
  url: string;
}

// @public (undocumented)
export interface Website {
  // (undocumented)
  audits: Audit[];
  // (undocumented)
  lastAudit: Audit;
  // (undocumented)
  url: string;
}

// @public (undocumented)
export type WebsiteListResponse = LASListResponse<Website>;
```
