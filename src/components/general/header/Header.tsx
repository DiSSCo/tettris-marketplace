/* Import Dependencies */
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Webroot */
import CETAFLogo from 'webroot/img/cetafLogo.png';

/* Import Styles */
import styles from './header.module.scss';


/** Component that renders the application's Header */
const Header = () => {
    return (
        <Container fluid
            className={styles.header}
        >
            <Row className="bgc-white py-2 px-2">
                <Col lg={{ span: 10, offset: 1 }}>
                    <Row>
                        <Col className="col-auto">
                            <Link to="/">
                                <img src={CETAFLogo}
                                    alt="CETAF Logo"
                                    className={styles.CETAFLogo}
                                />
                            </Link>
                        </Col>
                        <Col className="d-flex flex-column justify-content-center">
                            <h2 className="w-auto fs-3 fs-lg-2 tc-primary fw-bold">
                                Marketplace Prototype
                            </h2>
                            <h3 className="fs-4 tc-grey fw-lightBold">
                                The Taxonomic Expertise and Services Marketplace
                            </h3>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;