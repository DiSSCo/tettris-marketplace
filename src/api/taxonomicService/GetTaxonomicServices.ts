/* Import Dependencies */
import axios from 'axios';
import moment from 'moment';
import { isEmpty } from 'lodash';

/* Import Types */
import { TaxonomicService, CordraResultArray, Dict } from 'app/Types';

/* Import Sources */
import TaxonomicServiceFilters from 'sources/searchFilters/TaxonomicServiceFilters.json';


/**
 * Function that fetches the latest taxonomic services from the API
 * @param pageNumber The number of the current page of records
 * @returns An array of Taxonomic Service instances or an empty array
 */
const GetTaxonomicServices = async ({ pageNumber, pageSize, searchFilters }: { pageNumber: number, pageSize: number, searchFilters: { [searchFilter: string]: string } }) => {
    /* Base variables */
    let taxonomicServices: TaxonomicService[] = [];
    let metadata: Dict = {};

    /* Destructure search filters into string */
    let filters: string = '';

    /* Filter for the object type to be a taxonomic service */
    filters = filters.concat('/taxonomicService/ods\\:type:taxonomicService');

    /* Filter for state to be published */
    filters = filters.concat(' AND /taxonomicService/cetaf\\:state:published');

    if (!isEmpty(searchFilters)) {
        Object.entries(searchFilters).map(([key, value]) => {
            const alias: string | undefined = TaxonomicServiceFilters.taxonomicServiceFilters.find(taxonomicSearchFilter => taxonomicSearchFilter.name === key)?.alias;

            if (key === 'language') {
                /* Set array search for language */
                filters = filters.concat(` AND ` + `/taxonomicService/${(alias ?? key).replace(':', '\\:')}/_:` + `${value}`);
            } else if (key === 'query') {
                /* Set query to name search */
                filters = filters.concat(` AND ` + `/taxonomicService/erp\\:name:` + `${value}*`);
            } else {
                /* Get field alias from taxonomic service filters source */
                filters = filters.concat(` AND ` + `/taxonomicService/${(alias ?? key).replace(':', '\\:')}:` + `${value}`);
            }
        });
    };

    try {
        const result = await axios({
            method: 'get',
            url: `/Op.Search`,
            params: {
                pageSize,
                pageNum: (pageNumber - 1 >= 0) ? pageNumber - 1 : 0,
                targetId: 'service',
                query: filters
            },
            responseType: 'json'
        });

        /* Get result data from JSON */
        const data: CordraResultArray = result.data;

        /* Check if there are any results */
        if (!data.results.length) {
            throw (new Error('No results found', { cause: 200 }));
        };

        /* Set Taxonomic Services */
        data.results.forEach((dataFragment) => {
            const taxonomicService = dataFragment.attributes.content as TaxonomicService;

            /* Set created and modified */
            taxonomicService.taxonomicService['ods:created'] = moment(new Date(dataFragment.attributes.metadata.createdOn)).format('YYYY-MM-DDTHH:mm:ss.sssZ');
            taxonomicService.taxonomicService['dcterms:modified'] = moment(new Date(dataFragment.attributes.metadata.modifiedOn)).format('YYYY-MM-DDTHH:mm:ss.sssZ');

            /* Push to taxonomic services array */
            taxonomicServices.push(taxonomicService);
        });

        /* Set metadata */
        metadata = {
            totalRecords: data.size
        };
    } catch (error) {
        console.error(error);

        throw (error);
    };

    return {
        taxonomicServices,
        metadata
    };
}

export default GetTaxonomicServices;