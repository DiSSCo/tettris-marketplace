/* Import Dependencies */
import axios from 'axios';
import { format } from 'date-fns';

/* Import Types */
import { TaxonomicService, CordraResult, Dict } from 'app/Types';


/**
 * Function that sends a POST request to the API in order to insert a new taxonomic service
 * @param taxonomicService The taxonomic service to insert
 * @returns An instance of Taxonomic Service or undefined
 */
const InsertTaxonomicExpert = async ({ taxonomicServiceRecord }: { taxonomicServiceRecord?: Dict }) => {
    let taxonomicExpert: TaxonomicService | undefined;

    if (taxonomicServiceRecord) {
        /* Craft taxonomic service object */
        const newTaxonomicExpert = {
            type: 'TaxonomicService',
            attributes: {
                content: {
                    taxonomicService: {
                        "@type": 'TaxonomicService',
                        "schema:status": 'proposed',
                        "schema:ratingValue": 0,
                        ...taxonomicServiceRecord
                    }
                }
            }
        };

        try {
            const result = await axios({
                method: 'post',
                url: '/Op.Create',
                params: {
                    targetId: 'service'
                },
                data: newTaxonomicExpert,
                headers: {
                    'Content-type': 'application/json'
                },
                auth: {
                    username: 'TaxonomicMarketplace',
                    password: import.meta.env.VITE_CORDRA_PASSWORD
                },
                responseType: 'json'
            });

            /* Get result data from JSON */
            const data: CordraResult = result.data;

            /* Set Taxonomic Service */
            taxonomicExpert = data.attributes.content as TaxonomicService;

            /* Set created and modified */
            taxonomicExpert.taxonomicService['schema:dateCreated'] = format(new Date(data.attributes.metadata.createdOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            taxonomicExpert.taxonomicService['schema:dateModified'] = format(new Date(data.attributes.metadata.modifiedOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        } catch (error) {
            console.error(error);

            throw (error);
        };
    };

    return taxonomicExpert;
}

export default InsertTaxonomicExpert;