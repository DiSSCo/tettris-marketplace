/* Import Dependencies */
import { startCase } from "lodash";


/** Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return '';
    }
}

/** Function to replace capitals in a string with spaces to make a readable string */
const MakeReadableString = (string: string) => {
    const splitArray: RegExpMatchArray | null = string.match(/[A-Z]?[a-z]+|[/d]+|[A-Z]+(?![a-z])/g);

    return startCase(splitArray?.join(' ')) ?? startCase(string.split(/(?=[A-Z])/).join(' '));
};


export {
    Capitalize,
    MakeReadableString
}