/* Import Types */
import { TaxonomicService } from 'app/Types';
import { JSONResultArray } from 'app/Types';

/* Import Mock Data */
import AcceptedTaxonomicService from 'sources/mock/TaxonomicServiceAccepted.json';
import ReferenceCollection from 'sources/mock/ReferenceCollection.json';


/**
 * Function that fetches the latest taxonomic services from the API
 * @param pageNumber The number of the current page of records
 * @returns An array of Taxonomic Service instances or an empty array
 */
const GetTaxonomicServices = async (pageNumber: number) => {
    const pageSize: number = 12;
    let taxonomicServices: TaxonomicService[] = [];

    try {
        let result: { data: JSONResultArray } = {
            data: {
                data: [
                    { ...AcceptedTaxonomicService.data },
                    { ...ReferenceCollection.data }
                ],
                links: {
                    self: `https://marketplace.cetaf.org/api/v1/taxonomicServices?pageSize=${pageSize}&pageNumber=${pageNumber}`,
                    first: `https://marketplace.cetaf.org/api/v1/taxonomicServices?pageSize=${pageSize}&pageNumber=1`,
                    next: `https://marketplace.cetaf.org/api/v1/taxonomicServices?pageSize=${pageSize}&pageNumber=${pageNumber + 1}`,
                    ...(pageNumber > 1 && { previous: `https://marketplace.cetaf.org/api/v1/taxonomicServices?pageSize=${pageSize}&pageNumber=${pageNumber - 1}` })
                }
            }
        };

        /* Get result data from JSON */
        const data: JSONResultArray = result.data;

        /* Set Taxonomic Services */
        data.data.forEach((dataFragment) => {
            const taxonomicService = dataFragment.attributes as TaxonomicService;

            let counter = 0;

            while (counter < 6) {
                taxonomicServices.push(taxonomicService);

                counter++;
            }
        });
    } catch (error) {
        console.warn(error);
    }

    return taxonomicServices;
}

export default GetTaxonomicServices;