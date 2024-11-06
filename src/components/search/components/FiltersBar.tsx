/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useSearchParams } from 'react-router-dom';

/* Import Types */
import { Dict, Filter as FilterType } from 'app/Types';

/* Import Sources */
import TaxonomicServiceFilters from 'sources/searchFilters/TaxonomicServiceFilters.json';

/* Import Icons */
import { faMagnifyingGlass, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import Filter from './Filter';
import { QueryBar } from 'components/general/FormComponents';
import { Button } from 'components/general/CustomComponents';


/* Props Type */
type Props = {
    ToggleFilters?: Function
};


/** Component that renders the Filters Bar on the Search page, it contains:
 * search bar (input)
 * taxonomic scope filter (select)
 * publishing date filter (select)
 * language filter (select)
*/
const FiltersBar = (props: Props) => {
    const { ToggleFilters } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const filters: FilterType[] = [...TaxonomicServiceFilters.taxonomicServiceFilters];
    const initialValues: Dict = {};

    /* Set initial values */
    filters.forEach((filter) => {
        initialValues[filter.name] = searchParams.get(filter.name) ?? filter.default;
    });

    return (
        <Formik initialValues={{
            query: searchParams.get('query') ?? '',
            ...initialValues
        }}
            enableReinitialize={true}
            onSubmit={async (values) => {
                /* Filter handling is done in the individual components */
                await new Promise((resolve) => setTimeout(resolve, 100));

                /* For each form value, treat as search filter */
                Object.entries(values).forEach(([key, value]) => {
                    /* Remove filter from search params */
                    searchParams.delete(key);

                    /* Set filter to search params */
                    if (value && value !== 'taxonomicService') {
                        searchParams.set(key, value);
                    }
                });

                setSearchParams(searchParams);

                /* On mobile, close filters */
                ToggleFilters?.();
            }}
        >
            {({ values, setFieldValue, submitForm }) => {
                return (
                    <Form>
                        <Row>
                            {/* Search Bar */}
                            <Col xs={{ span: 12 }}
                                lg={{ span: 4 }}
                                className="mb-4 mb-lg-0"
                            >
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
                                        <Col key={filter.name}
                                            xs={{ span: 12 }}
                                            lg={{ span: 3 }}
                                            className="mb-2 mb-lg-0"
                                        >
                                            <Filter filter={filter}
                                                currentValue={values[filter.name as keyof typeof values]}
                                                hasDefault={!!filters.find(originalFilter => originalFilter.name === filter.name)?.default}
                                                SetFilterValue={(value: string | number | boolean) => setFieldValue(filter.name, value)}
                                                SubmitForm={() => submitForm()}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                            {/* Search button */}
                            <Col lg="auto"
                                className="d-none d-lg-block"
                            >
                                <Button type="submit"
                                    variant={searchParams.get('serviceType') === 'referenceCollection' ? 'secondary' : 'primary'}
                                >
                                    <p>Search</p>
                                </Button>
                            </Col>
                            {/* Deselect all filters button */}
                            <Col lg="auto"
                                className="ps-0 d-none d-lg-block"
                            >
                                <Button type="submit"
                                    variant={searchParams.get('serviceType') === 'referenceCollection' ? 'secondary' : 'primary'}
                                    OnClick={() => setSearchParams()}
                                >
                                    <FontAwesomeIcon icon={faFilterCircleXmark}
                                        size="lg"
                                    />
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default FiltersBar;