/* Import Types */
import { TaxonomicService as TaxonomicServiceType } from "./types/TaxonomicService";


/* General type for a dictionary */
export type Dict = {
    [name: string]: any;
};

/* Types for JSON Result Interfaces */
type DataFragment = {
    id: string,
    type: string,
    attributes: {
        taxonomicService?: TaxonomicServiceType,
        [property: string]: any
    }
}

export type JSONResult = {
    data: DataFragment,
    links: {
        self: string
    },
    meta?: {
        totalRecords: number
    }
};

export type JSONResultArray = {
    data: DataFragment[],
    links: {
        self: string,
        first?: string,
        next?: string,
        previous?: string
    },
    meta?: {
        totalRecords: number
    }
}

/* Type for a Taxonomic Service */
export type TaxonomicService = {
    taxonomicService: TaxonomicServiceType
}

/* Type for an Agent */
export type Agent = {
    "cetaf:agentId": string,
    "cetaf:fullName"?: string,
    "cetaf:role"?: string
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