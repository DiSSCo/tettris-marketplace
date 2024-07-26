/* Import Types */
import { TaxonomicService as TaxonomicServiceType } from "./types/TaxonomicService";


/* General type for a dictionary */
export type Dict = {
    [name: string]: any;
};

/* Types for JSON Result Interfaces */
export type CordraResult = {
    id: string,
    type: string,
    attributes: {
        content: {
            taxonomicService?: TaxonomicServiceType,
            [property: string]: any
        },
        metadata: {
            createdOn: number,
            createdBy: string,
            modifiedOn: number,
            modifiedBy: string
        }
    }
};

export type CordraResultArray = {
    size: number,
    results: CordraResult[]
};

/* Type for a Taxonomic Service */
export type TaxonomicService = {
    taxonomicService: TaxonomicServiceType
}

/* Type for an Agent */
export type Maintainer = {
    "schema:identifier"?: string;
    "schema:name"?: string;
    "schema:Organization"?: {
        "schema:identifier"?: string;
        "schema:legalName"?: string;
    };
}

/* Type for a Filter */
export type Filter = {
    name: string,
    type: string,
    default?: string,
    options?: {
        label: string,
        value: string,
        action?: Function
    }[]
};

/* Type for a Dropdown item */
export type DropdownItem = {
    label: string,
    value: string,
    action?: Function
};