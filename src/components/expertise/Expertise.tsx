/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';


/**
 * Component that renders the Expertise page
 * @returns JSX Component
 */
const Expertise = () => {
    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Expertise page body */}
            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <p className="fs-2 fw-lightBold">This page will be implemented later this year</p>
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            <Footer />
        </div>
    );
}

export default Expertise;