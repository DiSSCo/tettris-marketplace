/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import Header from "components/general/header/Header";
import Footer from 'components/general/footer/Footer';


/** Base component that renders the Home page */
const Home = () => {
    return (
        <div className="h-100 d-flex flex-column">
            <Header />

            <Container fluid className="flex-grow-1">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}>

                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Home;