## API Report File for "@backstage/plugin-azure-devops-backend"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { Build } from 'azure-devops-node-api/interfaces/BuildInterfaces';
import { BuildDefinitionReference } from 'azure-devops-node-api/interfaces/BuildInterfaces';
import { BuildRun } from '@backstage/plugin-azure-devops-common';
import { Config } from '@backstage/config';
import { DashboardPullRequest } from '@backstage/plugin-azure-devops-common';
import express from 'express';
import { GitRepository } from 'azure-devops-node-api/interfaces/GitInterfaces';
import { GitTag } from '@backstage/plugin-azure-devops-common';
import { Logger } from 'winston';
import { Project } from '@backstage/plugin-azure-devops-common';
import { PullRequest } from '@backstage/plugin-azure-devops-common';
import { PullRequestOptions } from '@backstage/plugin-azure-devops-common';
import { RepoBuild } from '@backstage/plugin-azure-devops-common';
import { Team } from '@backstage/plugin-azure-devops-common';
import { TeamMember } from '@backstage/plugin-azure-devops-common';
import { WebApi } from 'azure-devops-node-api';

// Warning: (ae-missing-release-tag) "AzureDevOpsApi" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class AzureDevOpsApi {
  constructor(logger: Logger, webApi: WebApi);
  // (undocumented)
  getAllTeams(): Promise<Team[]>;
  // (undocumented)
  getBuildDefinitions(
    projectName: string,
    definitionName: string,
  ): Promise<BuildDefinitionReference[]>;
  // (undocumented)
  getBuildList(
    projectName: string,
    repoId: string,
    top: number,
  ): Promise<Build[]>;
  // (undocumented)
  getBuildRuns(
    projectName: string,
    top: number,
    repoName?: string,
    definitionName?: string,
  ): Promise<BuildRun[]>;
  // (undocumented)
  getBuilds(
    projectName: string,
    top: number,
    repoId?: string,
    definitions?: number[],
  ): Promise<Build[]>;
  // (undocumented)
  getDashboardPullRequests(
    projectName: string,
    options: PullRequestOptions,
  ): Promise<DashboardPullRequest[]>;
  // (undocumented)
  getGitRepository(
    projectName: string,
    repoName: string,
  ): Promise<GitRepository>;
  // (undocumented)
  getGitTags(projectName: string, repoName: string): Promise<GitTag[]>;
  // (undocumented)
  getProjects(): Promise<Project[]>;
  // (undocumented)
  getPullRequests(
    projectName: string,
    repoName: string,
    options: PullRequestOptions,
  ): Promise<PullRequest[]>;
  // (undocumented)
  getRepoBuilds(
    projectName: string,
    repoName: string,
    top: number,
  ): Promise<RepoBuild[]>;
  // (undocumented)
  getTeamMembers({
    projectId,
    teamId,
  }: {
    projectId: string;
    teamId: string;
  }): Promise<TeamMember[] | undefined>;
}

// Warning: (ae-missing-release-tag) "createRouter" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function createRouter(options: RouterOptions): Promise<express.Router>;

// Warning: (ae-missing-release-tag) "RouterOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface RouterOptions {
  // (undocumented)
  azureDevOpsApi?: AzureDevOpsApi;
  // (undocumented)
  config: Config;
  // (undocumented)
  logger: Logger;
}

// (No @packageDocumentation comment for this package)
```