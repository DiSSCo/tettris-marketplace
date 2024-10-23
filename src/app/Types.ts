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
    "@type": string,
    "schema:identifier"?: string | Dict[];
    "schema:name"?: string;
    "schema:Affiliation"?: {
        "@type": string,
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

/* Type for a form field */
export type FormField = {
    jsonPath: string,
    title: string,
    description: string,
    type: string,
    options?: string[],
    mapping?: {
        [option: string]: string
    },
    required?: boolean
};

/* Type for a Dropdown item */
export type DropdownItem = {
    label: string,
    value: string,
    action?: Function
};