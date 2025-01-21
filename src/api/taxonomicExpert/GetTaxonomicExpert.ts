/* Import Dependencies */
import axios from 'axios';
import { format } from 'date-fns';

/* Import Types */
import { TaxonomicExpert, CordraResult } from 'app/Types';


/**
 * Function that fetches a taxonomic service from the API by providing a taxonomic service identifier
 * @param handle The handle identifier of the requested taxonomic service
 * @returns An instance of Taxonomic Service or undefined
 */
const GetTaxonomicExpert = async ({ handle }: { handle?: string }) => {
    let taxonomicExpert: TaxonomicExpert | undefined;

    if (handle) {
        const taxonomicExpertID: string = handle.replace(import.meta.env.VITE_HANDLE_URL as string, '');

        try {
            const result = await axios({
                method: 'get',
                url: '/Op.Retrieve',
                params: {
                    targetId: taxonomicExpertID
                },
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: CordraResult = result.data;

            /* Set Taxonomic Service */
            taxonomicExpert = data.attributes.content as TaxonomicExpert;

            // /* Check if Taxonomic Service is published, otherwise throw error */
            // if (taxonomicService.taxonomicService['schema:status'] !== 'accepted') {
            //     throw (new Error('This Taxonomic Service has not been published yet', { cause: 200 }));
            // };

            /* Set created and modified */
            taxonomicExpert.taxonomicExpert['schema:dateCreated'] = format(new Date(data.attributes.metadata.createdOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            taxonomicExpert.taxonomicExpert['schema:dateModified'] = format(new Date(data.attributes.metadata.modifiedOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        } catch (error) {
            console.error(error);

            throw (error);
        }
    };

    return taxonomicExpert;
}

export default GetTaxonomicExpert;