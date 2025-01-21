/* Import Dependencies */
import axios from 'axios';
import { format } from 'date-fns';
// import { isEmpty } from 'lodash';

/* Import Types */
import { TaxonomicExpert, CordraResultArray, Dict } from 'app/Types';

/* Import Sources */
// import TaxonomicExpertFilters from 'sources/searchFilters/TaxonomicExpertFilters.json';

/**
 * Function that fetches the latest taxonomic services from the API
 * @param pageNumber The number of the current page of records
 * @returns An array of Taxonomic Service instances or an empty array
 */
const GetTaxonomicExperts = async ({ pageNumber, pageSize, /*searchFilters*/ }: { pageNumber: number, pageSize: number, searchFilters: { [searchFilter: string]: string } }) => {
    /* Base variables */
    let taxonomicExperts: TaxonomicExpert[] = [];
    let metadata: Dict = {};

    /* Destructure search filters into string */
    let filters: string = '';

    /* Filter for the object type to be a taxonomic expert */
    filters = filters.concat('/taxonomicExpert/@type:TaxonomicExpert');

    /* Filter for state to be accepted */
    // filters = filters.concat(' AND /taxonomicService/schema\\:status:accepted');

    // if (!isEmpty(searchFilters)) {
    //     Object.entries(searchFilters).map(([key, value]) => {
    //         const alias: string | undefined = TaxonomicExpertFilters.taxonomicExpertFilters.find(taxonomicSearchFilter => taxonomicSearchFilter.name === key)?.alias;

    //         switch (key) {
    //             case 'language':
    //             case 'query':
    //                 /* Set query to name search */
    //                 filters = filters.concat(` AND ` + `(` + `/TaxonomicExpert/schema\\:Service/schema\\:name:` + `${value}*`
    //                     + ` OR ` + `/TaxonomicExpert/schema\\:taxonomicRange/_:` + `${value}*`
    //                     + ` OR ` + `/TaxonomicExpert/ods\\:topicDiscipline/_:` + `${value}*`
    //                     + `)`
    //                 );

    //                 break;
    //             case 'serviceType':
    //                 /* Set service type search */
    //                 filters = filters.concat(` AND ` + `/TaxonomicExpert/schema\\:Service/schema\\:serviceType:` + `${value}`);

    //                 break;
    //             default:
    //                 /* Get field alias from taxonomic service filters source */
    //                 filters = filters.concat(` AND ` + `/TaxonomicExpert/${(alias ?? key).replaceAll(':', '\\:')}:` + `${value}`);
    //         };
    //     });
    // };

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

        /* Set Taxonomic Expert */
        data.results.forEach((dataFragment) => {
            const taxonomicExpert = dataFragment.attributes.content as TaxonomicExpert;

            /* Set created and modified */
            taxonomicExpert.taxonomicExpert['schema:dateCreated'] = format(new Date(dataFragment.attributes.metadata.createdOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            taxonomicExpert.taxonomicExpert['schema:dateModified'] = format(new Date(dataFragment.attributes.metadata.modifiedOn), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

            /* Push to taxonomic services array */
            taxonomicExperts.push(taxonomicExpert);
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
        taxonomicExperts,
        metadata
    };
}

export default GetTaxonomicExperts;