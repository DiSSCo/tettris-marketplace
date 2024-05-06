/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { usePaginator, useAppSelector, useAppDispatch } from 'app/Hooks';

/* Import Store */
import { getTaxonomicServices, setTaxonomicServices } from 'redux-store/TaxonomicServiceSlice';

/* Import Types */
import { TaxonomicService } from 'app/Types';

/* Import API */
import GetTaxonomicServices from 'api/taxonomicService/GetTaxonomicServices';

/* Import Components */
import Header from 'components/general/header/Header';
import TopBar from './components/TopBar';
import FiltersBar from './components/FiltersBar';
import SearchResults from './components/SearchResults';
import Footer from 'components/general/footer/Footer';
import { Button, Spinner } from 'components/general/CustomComponents';


/**
 * Base component that returns the Search page
 * @returns JSX.Component
 */
const Search = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const taxonomicServices = useAppSelector(getTaxonomicServices);

    const paginator = usePaginator({
        Method: GetTaxonomicServices,
        Handler: (newTaxonomicServices: TaxonomicService[]) => {
            /* On receivel of a new page with records, add them to the total */
            dispatch(setTaxonomicServices([...taxonomicServices, ...newTaxonomicServices]));
        },
        key: 'taxonomicServices',
        currentRecords: taxonomicServices
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1 gradient-primary overflow-hidden">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column pt-5"
                    >
                        {/* Top Bar */}
                        <Row>
                            <Col>
                                <TopBar />
                            </Col>
                        </Row>
                        {/* Filters Bar */}
                        <Row className="mt-3">
                            <Col>
                                <FiltersBar />
                            </Col>
                        </Row>
                        {/* Results Count */}
                        <Row className="mt-4">
                            <Col>
                                <p className="fs-4 fw-lightBold">224 results</p>
                            </Col>
                        </Row>
                        {/* Search Results body */}
                        <Row className="flex-grow-1 mt-4 overflow-x-hidden">
                            <Col>
                                {/* Search Result blocks */}
                                <Row>
                                    <Col>
                                        <SearchResults />
                                    </Col>
                                </Row>
                                {/* Load more button */}
                                <Row className="mb-4">
                                    <Col className="d-flex justify-content-center">
                                        {!paginator.loading ?
                                            <Button type="button"
                                                variant="primary"
                                                OnClick={() => paginator.Next()}
                                            >
                                                Load more
                                            </Button>
                                            : <Spinner />
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            <Footer />
        </div >
    );
}

export default Search;