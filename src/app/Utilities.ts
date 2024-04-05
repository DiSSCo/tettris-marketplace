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
    let readableString: string = string;

    for (const character of string) {
        if (character === character.toUpperCase()) {
            let splittedArray = string.split(character, 2);

            readableString = `${splittedArray[0]} ${character}${splittedArray[1]}`;
        }
    }

    return Capitalize(readableString);
}


export {
    Capitalize,
    MakeReadableString
}