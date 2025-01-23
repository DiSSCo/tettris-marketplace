/* Import Dependencies */
import axios from 'axios';
// import { format } from 'date-fns';

/* Import Types */
import { TaxonomicExpert, CordraResult, Dict } from 'app/Types';


/**
 * Function that sends a POST request to the API in order to insert a new taxonomic expert
 * @param taxonomicExpert The taxonomic expert to insert
 * @returns An instance of Taxonomic Service or undefined
 */
const InsertTaxonomicExpert = async ({ taxonomicExpertRecord }: { taxonomicExpertRecord?: Dict }) => {
    let taxonomicExpert: TaxonomicExpert | undefined;

    if (taxonomicExpertRecord) {
        /* Craft taxonomic service object */
        const newTaxonomicExpert = {
            type: 'TaxonomicExpert',
            attributes: {
                content: {
                    taxonomicExpert: {
                        "@type": 'TaxonomicExpert',
                        ...taxonomicExpertRecord
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

            /* Set Taxonomic Expert */
            taxonomicExpert = data.attributes.content as TaxonomicExpert;

            /* Set created and modified */
            // taxonomicExpert.taxonomicService['schema:dateCreated'] = format(new Date(data.attributes.metadata.createdOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            // taxonomicExpert.taxonomicService['schema:dateModified'] = format(new Date(data.attributes.metadata.modifiedOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        } catch (error) {
            console.error(error);

            throw (error);
        };
    };

    return taxonomicExpert;
}

export default InsertTaxonomicExpert;