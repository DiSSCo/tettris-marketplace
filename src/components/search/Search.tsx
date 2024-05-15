/* Import Dependencies */
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/* Import Hooks */
import { usePaginator, useAppSelector, useAppDispatch } from 'app/Hooks';

/* Import Store */
import { getTaxonomicServices, setTaxonomicServices, concatToTaxonomicServices } from 'redux-store/TaxonomicServiceSlice';

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
    const [searchParams] = useSearchParams();

    /* Base variables */
    const taxonomicServices = useAppSelector(getTaxonomicServices);

    const paginator = usePaginator({
        Initiate: () => dispatch(setTaxonomicServices([])),
        Method: GetTaxonomicServices,
        Handler: (taxonomicServices: TaxonomicService[]) => {
            /* On receival of a new page with records, add them to the total */
            dispatch(concatToTaxonomicServices(taxonomicServices));
        },
        pageSize: 12,
        key: 'taxonomicServices',
        allowSearchParams: true
    });

    /* ClassNames */
    const mainBodyClass = classNames({
        'gradient-primary': true,
        'gradient-secondary': searchParams.get('taxonomicServiceType') === 'referenceCollection'
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className={`${mainBodyClass} flex-grow-1 overflow-hidden tr-smooth`}>
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column pt-5 px-4 px-lg-3"
                    >
                        {/* Top Bar */}
                        <Row>
                            <Col>
                                <TopBar />
                            </Col>
                        </Row>
                        {/* Filters Bar */}
                        <Row className="mt-3 d-none d-lg-flex">
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
                                                variant={searchParams.get('taxonomicServiceType') === 'referenceCollection' ? 'secondary' : 'primary'}
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