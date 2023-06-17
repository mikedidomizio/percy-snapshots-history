// Generated with QuickType
export interface PercyGetBuildsResponse {
  data: PercyBuild[]
  included: Included[]
}

export interface PercyBuild {
  type: DataType
  id: string
  attributes: DatumAttributes
  links: DatumLinks
  relationships: DatumRelationships
  meta: Meta
}

export interface DatumAttributes {
  branch: string
  type: AttributesType
  'build-number': number
  partial: boolean
  'web-url': string
  'commit-html-url': string
  'branch-html-url': string
  'pull-request-html-url': null
  state: State
  'review-state': ReviewState | null
  'review-state-reason': ReviewStateReason | null
  'is-pull-request': boolean
  'pull-request-number': null
  'pull-request-title': null
  'user-agent': string
  'total-snapshots': number | null
  'total-snapshots-requesting-changes': number
  'total-snapshots-unreviewed': number | null
  'total-comparisons': number | null
  'total-comparisons-finished': number
  'total-comparisons-diff': number
  'total-open-comments': number
  'failed-snapshots-count': number
  'failure-reason': null | string
  'failure-details': null
  'parallel-nonce': null
  'parallel-total-shards': null
  'finished-at': Date | null
  'approved-at': Date | null
  'created-at': Date
  'updated-at': Date
}

export enum ReviewState {
  Approved = 'approved',
  Unreviewed = 'unreviewed',
}

export enum ReviewStateReason {
  AllSnapshotsApproved = 'all_snapshots_approved',
  AllSnapshotsApprovedPreviously = 'all_snapshots_approved_previously',
  NoDiffs = 'no_diffs',
  UnreviewedSnapshots = 'unreviewed_snapshots',
}

export enum State {
  Failed = 'failed',
  Finished = 'finished',
}

export enum AttributesType {
  Web = 'web',
}

export interface DatumLinks {
  self: string
}

export interface Meta {
  'finalize-link': string
  'approve-link': string
}

export interface DatumRelationships {
  project: ApprovedBy
  commit: ApprovedBy
  repo: ApprovedBy
  'base-build': ApprovedBy
  'base-build-strategy': BaseBuildStrategy
  'approved-by': ApprovedBy
  snapshots: Comparisons
  comparisons: Comparisons
  browsers: Browsers
  'removed-snapshots': Comparisons
  'failed-snapshots': Comparisons
  'missing-resources': Comparisons
}

export interface ApprovedBy {
  links: ApprovedByLinks
  data: DAT | null
}

export interface DAT {
  type: DataType
  id: string
}

export enum DataType {
  BrowserFamilies = 'browser-families',
  BrowserTargets = 'browser-targets',
  Browsers = 'browsers',
  Builds = 'builds',
  Commits = 'commits',
  Organizations = 'organizations',
  ProjectBrowserTargets = 'project-browser-targets',
  Projects = 'projects',
  Repos = 'repos',
  Users = 'users',
  VersionControlIntegrations = 'version-control-integrations',
}

export interface ApprovedByLinks {
  self?: string
  related: string
}

export interface BaseBuildStrategy {}

export interface Browsers {
  links: ApprovedByLinks
  data: DAT[]
}

export interface Comparisons {
  links: ApprovedByLinks
}

export interface Included {
  type: DataType
  id: string
  attributes: IncludedAttributes
  links?: DatumLinks
  relationships?: IncludedRelationships
  meta?: Meta
}

export interface IncludedAttributes {
  name?: string
  slug?: string
  type?: AttributesType
  'full-slug'?: string
  'is-enabled'?: boolean
  'diff-base'?: string
  'auto-approve-branch-filter'?: string
  'approval-required-branch-filter'?: null
  'default-base-branch'?: Branch
  'updated-at'?: Date
  'publicly-readable'?: boolean
  'is-demo'?: boolean
  'is-auto-browser-upgrade'?: boolean
  'wait-for-base-build'?: boolean
  'diff-sensitivity-level'?: number
  'html-url'?: string
  hostname?: string
  source?: string
  sha?: string
  message?: string
  'author-name'?: string
  version?: string
  branch?: Branch
  'build-number'?: number
  partial?: boolean
  'web-url'?: string
  'commit-html-url'?: string
  'branch-html-url'?: string
  'pull-request-html-url'?: null
  state?: State
  'review-state'?: ReviewState
  'review-state-reason'?: ReviewStateReason
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
  'total-open-comments'?: number
  'failed-snapshots-count'?: number
  'failure-reason'?: null
  'failure-details'?: null
  'parallel-nonce'?: null
  'parallel-total-shards'?: null
  'finished-at'?: Date
  'approved-at'?: Date | null
  'created-at'?: Date
  'avatar-url'?: string
  'web-theme'?: string
  'diff-color'?: null
}

export enum Branch {
  Main = 'main',
}

export interface IncludedRelationships {
  organization?: Organization
  repo?: ApprovedBy
  builds?: Builds
  tokens?: Builds
  'browser-targets'?: BrowserTargets
  'project-browser-targets'?: BrowserTargets
  'webhook-configs'?: BrowserTargets
  'version-control-integration'?: ApprovedBy
  'browser-family'?: BrowserFamily
  project?: ApprovedBy
  commit?: ApprovedBy
  'base-build'?: ApprovedBy
  'base-build-strategy'?: BaseBuildStrategy
  'approved-by'?: ApprovedBy
  snapshots?: Comparisons
  comparisons?: Comparisons
  browsers?: Browsers
  'removed-snapshots'?: Comparisons
  'failed-snapshots'?: Comparisons
  'missing-resources'?: Comparisons
}

export interface BrowserFamily {
  data: DAT
}

export interface BrowserTargets {
  data: DAT[]
}

export interface Builds {
  links: BuildsLinks
}

export interface BuildsLinks {
  related: string
}

export interface Organization {
  links: BuildsLinks
  data: DAT
}
