export interface BuildItemsResponse {
    data: BuildItem[];
    meta: Meta;
}

export interface BuildItem {
    type:       string;
    attributes: Attributes;
}

export interface Attributes {
    index:                             number;
    "cover-snapshot-id":               number;
    "cover-snapshot-name":             string;
    "item-count":                      number;
    "snapshot-ids":                    number[];
    "review-state":                    string;
    "review-state-reason":             string;
    "total-open-comments":             number;
    "cover-diff-image-url":            string;
    "cover-head-screenshot-image-url": string;
}

export interface Meta {
    filters: Filters;
}

export interface Filters {
    category:      string;
    subcategories: string[];
    browser_ids:   string[];
    widths:        string[];
}
