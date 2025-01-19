/* Import Dependencies */
import axios from 'axios';
import { format } from 'date-fns';

/* Import Types */
import { TaxonomicService, CordraResult } from 'app/Types';


/**
 * Function that fetches a taxonomic service from the API by providing a taxonomic service identifier
 * @param handle The handle identifier of the requested taxonomic service
 * @returns An instance of Taxonomic Service or undefined
 */
const GetTaxonomicExpert = async ({ handle }: { handle?: string }) => {
    let taxonomicService: TaxonomicService | undefined;

    if (handle) {
        const taxonomicServiceID: string = handle.replace(import.meta.env.VITE_HANDLE_URL as string, '');

        try {
            const result = await axios({
                method: 'get',
                url: '/Op.Retrieve',
                params: {
                    targetId: taxonomicServiceID
                },
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: CordraResult = result.data;

            /* Set Taxonomic Service */
            taxonomicService = data.attributes.content as TaxonomicService;

            /* Check if Taxonomic Service is published, otherwise throw error */
            if (taxonomicService.taxonomicService['schema:status'] !== 'accepted') {
                throw (new Error('This Taxonomic Service has not been published yet', { cause: 200 }));
            };

            /* Set created and modified */
            taxonomicService.taxonomicService['schema:dateCreated'] = format(new Date(data.attributes.metadata.createdOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            taxonomicService.taxonomicService['schema:dateModified'] = format(new Date(data.attributes.metadata.modifiedOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        } catch (error) {
            console.error(error);

            throw (error);
        }
    };

    return taxonomicService;
}

export default GetTaxonomicExpert;