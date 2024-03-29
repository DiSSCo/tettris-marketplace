/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Webroot */
import EUFundedLogo from 'webroot/img/euFundedLogo.png';

/* Import Styles */
import styles from './footer.module.scss';


/** Component that renders the application's Footer */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Container fluid>
            <Row className="bgc-dark py-2">
                <Col lg={{ span: 10, offset: 1 }}>
                    <Row>
                        <Col className="col-lg-auto">
                            <img src={EUFundedLogo}
                                alt="Funded by EU logo"
                                className={styles.EUFundedLogo}
                            />
                        </Col>
                        <Col className="d-flex flex-column justify-content-center">
                            <p className="fs-5 tc-white fw-lightBold">
                                TETTRIs Grant Agreement 101081903
                            </p>
                        </Col>
                        <Col className="col-lg-auto">
                            <div className="h-100 d-flex align-items-center fs-4 tc-white fw-lightBold">
                                <span>
                                    Privacy policy
                                </span>
                                <span className="px-2">|</span>
                                <span>
                                    Terms and Conditions
                                </span>
                                <span className="px-2">|</span>
                                <span>
                                    {`CETAF ${currentYear}`}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;