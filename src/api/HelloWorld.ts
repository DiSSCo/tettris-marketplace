/* Import Dependencies */
import axios from 'axios';


/**
 * Function that checks if the API is online with a 'hello world' protocol
 * @returns Boolean, true if API is online, false if not
 */
const HelloWorld = async () => {
    /* Base variables */
    let validResponse: boolean = false;

    try {
        await axios({
            method: 'get',
            url: `/Op.Hello`,
            params: {
                targetId: 'service'
            },
            responseType: 'json'
        });

        validResponse = true;
    } catch (error) {
        console.warn(error);

        throw(error);
    };

    return validResponse;
}

export default HelloWorld;