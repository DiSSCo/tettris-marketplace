/* General type for a dictionary */
export type Dict = {
    [name: string]: any;
};

/* Type for a Filter */
export type Filter = {
    name: string,
    type: string,
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