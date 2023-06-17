export interface PercyListSnapshots {
  data: Snapshot[]
  included: Included[]
}

export interface Snapshot {
  type: Type
  id: string
  attributes: DatumAttributes
  links: DatumLinks
  relationships: DatumRelationships
}

export interface DatumAttributes {
  name: string
  'review-state': ReviewState
  'review-state-reason': ReviewStateReason
  fingerprint: null | string
  'total-open-comments': number
  'is-reintroduced': boolean
  'enable-javascript': boolean
  'scope-selector': null
}

export enum ReviewState {
  Approved = 'approved',
}

export enum ReviewStateReason {
  NoDiffs = 'no_diffs',
  UserApproved = 'user_approved',
}

export interface DatumLinks {
  self: string
}

export interface DatumRelationships {
  build: Build
  'latest-changed-ancestor': LatestChangedAncestor
  screenshots: Screenshots
  comparisons: Ons
  'ignored-regions': Ons
  'missing-resources': MissingResources
}

export interface Build {
  data: DAT | null
}

export interface DAT {
  type: Type
  id: string
}

export enum Type {
  BrowserFamilies = 'browser-families',
  Browsers = 'browsers',
  Builds = 'builds',
  Commits = 'commits',
  Comparisons = 'comparisons',
  Images = 'images',
  Projects = 'projects',
  Repos = 'repos',
  Screenshots = 'screenshots',
  Snapshots = 'snapshots',
}

export interface Ons {
  data: DAT[]
}

export interface LatestChangedAncestor {
  links: LatestChangedAncestorLinks
}

export interface LatestChangedAncestorLinks {
  related: string
}

export interface MissingResources {
  links: MissingResourcesLinks
}

export interface MissingResourcesLinks {
  self: string
  related: string
}

export interface Screenshots {}

export interface Included {
  type: Type
  id: string
  attributes?: IncludedAttributes
  links?: DatumLinks
  relationships?: IncludedRelationships
  meta?: Meta
}

export interface IncludedAttributes {
  state?: State
  width?: number
  'diff-ratio'?: number
  'ignored-top'?: number
  'ignored-bottom'?: number
  'external-debug-url'?: null
  url?: string
  height?: number
  name?: string
  'review-state'?: ReviewState
  'review-state-reason'?: ReviewStateReason
  fingerprint?: null
  'total-open-comments'?: number
  'is-reintroduced'?: boolean
  'enable-javascript'?: boolean
  'scope-selector'?: null
  branch?: string
  type?: string
  'build-number'?: number
  partial?: boolean
  'web-url'?: string
  'commit-html-url'?: string
  'branch-html-url'?: string
  'pull-request-html-url'?: null
  'is-pull-request'?: boolean
  'pull-request-number'?: null
  'pull-request-title'?: null
  'user-agent'?: string
  'total-snapshots'?: number
  'total-snapshots-requesting-changes'?: number
  'total-snapshots-unreviewed'?: number
  'total-comparisons'?: number
  'total-comparisons-finished'?: number
  'total-comparisons-diff'?: number
  'failed-snapshots-count'?: number
  'failure-reason'?: null
  'failure-details'?: null
  'parallel-nonce'?: null
  'parallel-total-shards'?: null
  'finished-at'?: Date
  'approved-at'?: Date
  'created-at'?: Date
  'updated-at'?: Date
  version?: string
  slug?: string
}

export enum State {
  Finished = 'finished',
}

export interface Meta {
  'finalize-link': string
  'approve-link': string
}

export interface IncludedRelationships {
  'head-snapshot'?: LatestChangedAncestor
  'base-snapshot'?: BaseSnapshot
  'head-screenshot'?: Build
  'head-build'?: Build
  'base-screenshot'?: Build
  'diff-image'?: Build
  browser?: Build
  'comparison-tag'?: Build
  snapshot?: MissingResources
  image?: ApprovedBy
  build?: Build
  'latest-changed-ancestor'?: LatestChangedAncestor
  screenshots?: Screenshots
  comparisons?: ApprovedBy
  'ignored-regions'?: Ons
  'missing-resources'?: MissingResources
  project?: ApprovedBy
  commit?: ApprovedBy
  repo?: ApprovedBy
  'base-build'?: ApprovedBy
  'base-build-strategy'?: Screenshots
  'approved-by'?: ApprovedBy
  snapshots?: MissingResources
  browsers?: ApprovedBy
  'removed-snapshots'?: MissingResources
  'failed-snapshots'?: MissingResources
  'browser-family'?: Build
}

export interface ApprovedBy {
  links?: MissingResourcesLinks
  data?: DAT[] | DAT | null
}

export interface BaseSnapshot {
  links: LatestChangedAncestorLinks
  data: DAT
}
