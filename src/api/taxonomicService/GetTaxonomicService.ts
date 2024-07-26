/* Import Dependencies */
import axios from 'axios';
import moment from 'moment';

/* Import Types */
import { TaxonomicService, CordraResult } from 'app/Types';


/**
 * Function that fetches a taxonomic service from the API by providing a taxonomic service identifier
 * @param handle The handle identifier of the requested taxonomic service
 * @returns An instance of Taxonomic Service or undefined
 */
const GetTaxonomicService = async ({ handle }: { handle?: string }) => {
    let taxonomicService: TaxonomicService | undefined;

    if (handle) {
        const taxonomicServiceID: string = handle.replace(process.env.REACT_APP_HANDLE_URL as string, '');

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
            if (taxonomicService.taxonomicService['schema:status'] !== 'published') {
                throw (new Error('This Taxonomic Service has not been published yet', { cause: 200 }));
            };

            /* Set created and modified */
            taxonomicService.taxonomicService['schema:dateCreated'] = moment(new Date(data.attributes.metadata.createdOn)).format('YYYY-MM-DDTHH:mm:ss.sssZ');
            taxonomicService.taxonomicService['schema:dateModified'] = moment(new Date(data.attributes.metadata.modifiedOn)).format('YYYY-MM-DDTHH:mm:ss.sssZ');
        } catch (error) {
            console.error(error);

            throw (error);
        }
    };

    return taxonomicService;
}

export default GetTaxonomicService;