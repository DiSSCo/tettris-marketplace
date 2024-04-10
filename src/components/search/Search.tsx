/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch } from 'app/Hooks';
import { setTaxonomicServices } from 'redux-store/TaxonomicServiceSlice';

/* Import API */
import GetTaxonomicServices from 'api/taxonomicService/GetTaxonomicServices';

/* Import Components */
import Header from 'components/general/header/Header';
import TopBar from './components/TopBar';
import FiltersBar from './components/FiltersBar';
import SearchResults from './components/SearchResults';
import Footer from 'components/general/footer/Footer';


/**
 * Base component that returns the Search page
 * @returns JSX.Component
 */
const Search = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const [pageNumber, setPageNumber] = useState<number>(1);

    /** OnLoad: Fetch Taxonomic Services */
    useEffect(() => {
        GetTaxonomicServices(pageNumber).then((taxonomicServices) => {
            dispatch(setTaxonomicServices(taxonomicServices));
        }).catch(error => {
            console.warn(error);
        })
    }, []);

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column py-5"
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
                        {/* Search Results */}
                        <Row className="flex-grow-1 mt-4 overflow-x-hidden">
                            <Col>
                                <SearchResults />
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