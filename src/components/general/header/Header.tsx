/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Webroot */
import CETAFLogo from 'webroot/img/cetafLogo.png';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


/** Component that renders the application's Header */
const Header = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg={{ span: 10, offset: 1 }}>
                    <Row>
                        <Col className="col-lg-auto">
                            <img src={CETAFLogo}
                                alt="CETAF Logo"
                            />
                        </Col>
                        <Col>
                            <p>
                                <h2 className="fs-2 c-primary fw-lightBold">
                                    Marketplace
                                </h2>
                            </p>
                            <p>
                                <h3 className="fs-3 c-grey fw-lightBold">
                                    The Taxonomic Expertise and Services Marketplace
                                </h3>
                            </p>
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faBars} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;