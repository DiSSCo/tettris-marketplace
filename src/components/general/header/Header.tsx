/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useFetch } from 'app/Hooks';

/* Import Webroot */
import CETAFLogo from 'webroot/img/cetafLogo.png';

/* Import Styles */
import styles from './header.module.scss';

/* Import Icons */
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import HelloWorld from 'api/HelloWorld';


/** Component that renders the application's Header */
const Header = () => {
    /* Base variables */
    const [apiOnline, setApiOnline] = useState<boolean | undefined>();

    const fetch = useFetch();

    fetch.Fetch({
        Method: HelloWorld,
        Handler: (response: boolean) => {
            setApiOnline(response);
        },
        ErrorHandler: () => {
            setApiOnline(false);
        }
    });

    console.log(apiOnline);

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
                            <h3 className="fs-4 fs-lg-3 tc-grey fw-lightBold">
                                The Taxonomic Expertise and Services Marketplace
                            </h3>
                        </Col>
                        {apiOnline === false &&
                            <Col className="d-flex justify-content-end align-items-center">
                                <p className="tc-error fw-lightBold"><FontAwesomeIcon icon={faInfoCircle} /> API service is offline</p>
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;