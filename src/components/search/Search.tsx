/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import Header from 'components/general/header/Header';
import TopBar from './components/TopBar';
import FiltersBar from './components/FiltersBar';
import Footer from 'components/general/footer/Footer';


/** Base component that renders the Search page */
const Search = () => {
    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 py-5"
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
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            <Footer />
        </div >
    );
}

export default Search;