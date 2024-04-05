/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict, Filter as FilterType } from 'app/Types';

/* Import Sources */
import TaxonomicServiceFilters from 'sources/searchFilters/TaxonomicServiceFilters.json';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { QueryBar } from 'components/general/FormComponents';
import Filter from './Filter';


/** Component that renders the Filters Bar on the Search page, it contains:
 * search bar (input)
 * taxonomic scope filter (select)
 * publishing date filter (select)
 * language filter (select)
*/
const FiltersBar = () => {
    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const filters: FilterType[] = [...TaxonomicServiceFilters.taxonomicServiceFilters];
    const initialValues: Dict = {};

    /* Set initial values */
    filters.forEach((filter) => {
        initialValues[filter.name] = '';
    });

    return (
        <Formik initialValues={{
            query: searchParams.get('query') ?? '',
            ...initialValues
        }}
            onSubmit={async (values) => {
                /* Filter handling is done in the individual components */
                await new Promise((resolve) => setTimeout(resolve, 100));

                /* Submit search query */
                if (values.query) {
                    searchParams.set('query', values.query);
                } else {
                    searchParams.delete('query');
                }

                setSearchParams(searchParams);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <Row>
                        {/* Search Bar */}
                        <Col lg={{ span: 3 }}>
                            <QueryBar name="query"
                                placeholder="Enter a search query"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </QueryBar>
                        </Col>
                        {/* Filters */}
                        <Col>
                            <Row>
                                {filters.map((filter) => (
                                    <Col lg={{ span: 3 }}>
                                        <Filter filter={filter}
                                            currentValue={values[filter.name as keyof typeof values]}
                                            SetFilterValue={(value: string | number | boolean) => setFieldValue(filter.name, value)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default FiltersBar;