export interface Organization {
    data:     Data;
    included: Included[];
}

export interface Data {
    type:          string;
    id:            string;
    attributes:    DataAttributes;
    links:         DataLinks;
    relationships: DataRelationships;
}

export interface DataAttributes {
    name:                              string;
    slug:                              string;
    type:                              string;
    "full-slug":                       string;
    "is-enabled":                      boolean;
    "diff-base":                       string;
    "auto-approve-branch-filter":      string;
    "approval-required-branch-filter": null;
    "default-base-branch":             string;
    "updated-at":                      Date;
    "publicly-readable":               boolean;
    "is-demo":                         boolean;
    "is-auto-browser-upgrade":         boolean;
    "wait-for-base-build":             boolean;
    "diff-sensitivity-level":          number;
}

export interface DataLinks {
    self: string;
}

export interface DataRelationships {
    organization:              OrganizationClass;
    repo:                      OrganizationClass;
    builds:                    Builds;
    tokens:                    Builds;
    "browser-targets":         BrowserTargets;
    "project-browser-targets": BrowserTargets;
    "webhook-configs":         BrowserTargets;
}

export interface BrowserTargets {
    data: DAT[];
}

export interface DAT {
    type: string;
    id:   string;
}

export interface Builds {
    links: BuildsLinks;
}

export interface BuildsLinks {
    related: string;
}

export interface OrganizationClass {
    links: BuildsLinks;
    data:  DAT;
}

export interface Included {
    type:           string;
    id:             string;
    attributes?:    IncludedAttributes;
    relationships?: IncludedRelationships;
}

export interface IncludedAttributes {
    name?:                       string;
    slug?:                       string;
    "html-url"?:                 string;
    hostname?:                   string;
    source?:                     string;
    "version-target"?:           string;
    "deprecation-period-start"?: null;
    "deprecation-period-end"?:   null;
}

export interface IncludedRelationships {
    "version-control-integration"?: VersionControlIntegration;
    "operating-system"?:            OperatingSystem;
    "browser-family"?:              BrowserFamily;
    "browser-target"?:              BrowserFamily;
    project?:                       BrowserFamily;
}

export interface BrowserFamily {
    data: DAT;
}

export interface OperatingSystem {
}

export interface VersionControlIntegration {
    links: VersionControlIntegrationLinks;
    data:  DAT;
}

export interface VersionControlIntegrationLinks {
    self:    string;
    related: string;
}
