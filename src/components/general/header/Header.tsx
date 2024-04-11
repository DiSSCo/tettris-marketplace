/* Import Dependencies */
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Webroot */
import CETAFLogo from 'webroot/img/cetafLogo.png';

/* Import Styles */
import styles from './header.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


/** Component that renders the application's Header */
const Header = () => {
    return (
        <Container fluid>
            <Row className="bgc-white py-2">
                <Col lg={{ span: 10, offset: 1 }}>
                    <Row>
                        <Col className="col-lg-auto">
                            <Link to="/">
                                <img src={CETAFLogo}
                                    alt="CETAF Logo"
                                    className={styles.CETAFLogo}
                                />
                            </Link>
                        </Col>
                        <Col className="d-flex flex-column justify-content-center">
                            <h2 className="fs-2 tc-primary fw-bold">
                                Marketplace
                            </h2>
                            <h3 className="fs-3 tc-grey fw-lightBold">
                                The Taxonomic Expertise and Services Marketplace
                            </h3>
                        </Col>
                        <Col className="col-lg-auto d-flex flex-column justify-content-center">
                            <FontAwesomeIcon icon={faBars}
                                className="fs-2"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;