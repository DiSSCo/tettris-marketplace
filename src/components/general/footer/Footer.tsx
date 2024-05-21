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
            <Row className="bgc-dark py-2 px-2 px-lg-0">
                <Col lg={{ span: 10, offset: 1 }}>
                    {/* Mobile */}
                    <Row className="d-flex d-lg-none">
                        <Col>
                            <Row>
                                <Col>
                                    <p className="fs-5 tc-white fw-lightBold">
                                        TETTRIs Grant Agreement 101081903
                                    </p>
                                </Col>
                                <Col className="col-auto">
                                    <p className="fs-5 tc-white">{`CETAF ${currentYear}`}</p>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Row className="mt-2 align-items-end">
                                        <Col>
                                            <img src={EUFundedLogo}
                                                alt="Funded by EU logo"
                                                className={styles.EUFundedLogo}
                                            />
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <div className="h-100 fs-5 tc-white fw-lightBold text-end">
                                                        <p>Privacy policy</p>
                                                        <p className="mt-1">Terms and Conditions</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* Desktop */}
                    <Row className="d-none d-lg-flex">
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
                            <div className="h-100 d-flex align-items-center fs-5 tc-white fw-lightBold">
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