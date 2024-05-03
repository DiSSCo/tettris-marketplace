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
    const splitArray: string[] = string.split(/(?=[A-Z])/);

    return Capitalize(splitArray.join(' '));
}


export {
    Capitalize,
    MakeReadableString
}