/* Import Dependencies */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, } from 'react-bootstrap';

// /* Import Hooks */
import { useAppSelector, useAppDispatch, useFetch } from 'app/Hooks';

// /* Import Store */
import { setIsApiOnline } from 'redux-store/AppStore';
import { getTaxonomicExpert, setTaxonomicExpert } from 'redux-store/TaxonomicExpertSlice';

// /* Import Types */
import { TaxonomicExpert as TaxonomicServiceType, } from 'app/Types';

// /* Import API */
import GetTaxonomicExpert from 'api/taxonomicExpert/GetTaxonomicExpert';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import { BreadCrumbs, Spinner } from 'components/general/CustomComponents';
import TopBar from 'components/taxonomicService/components/TopBar';


const TaxonomicExpert = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const fetch = useFetch();

    // /* Base variables */
    const taxonomicExpert: TaxonomicServiceType | undefined = useAppSelector(getTaxonomicExpert);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);
    const taxonomicServiceID: string = `${params.prefix}/${params.suffix}`;

    /* Fetch taxonomic service */
    fetch.Fetch({
        Method: GetTaxonomicExpert,
        Handler: (taxonomicExpert: TaxonomicServiceType) => {
            dispatch(setTaxonomicExpert(taxonomicExpert));
            dispatch(setIsApiOnline(true));
        },
        ErrorHandler: (error: Error) => {
            setErrorMessage(error.message);

            if (error?.cause !== 200) {
                dispatch(setIsApiOnline(false));
            }
        },
        params: { handle: taxonomicServiceID }
    });

    // /* Time out to check if the taxonomic service is still being loaded after 1.5 seconds */
    setTimeout(() => {
        if (fetch.loading) {
            setDisplaySpinner(true);
        };
    }, 1500);

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column pt-3 pt-lg-5 px-4 px-lg-3"
                    >
                        {/* If data is still being loaded after 1.5 seconds, display spinner */}
                        {(fetch.loading && displaySpinner) &&
                            <Row className="flex-grow-1">
                                <Col className="d-flex justify-content-center align-items-center">
                                    <div className="text-center">
                                        <p className="fs-2 fw-lightBold pb-2">Loading Taxonomic Service</p>
                                        <Spinner />
                                    </div>
                                </Col>
                            </Row>
                        }
                        {/* If taxonomic expert is present */}
                        {taxonomicExpert &&
                            <>
                                {/* Bread crumbs */}
                                <Row>
                                    <Col>
                                        <BreadCrumbs />
                                    </Col>
                                </Row>
                                {/* Top bar */}
                                <Row className="mt-3 pt-lg-0">
                                    <Col>
                                        {/* <TopBar taxonomicService={taxonomicExpert} /> */}
                                    </Col>
                                </Row>
                                {/* Scrollable content */}
                                <Row className="flex-grow-1 overflow-scroll mt-3 mb-3">
                                    <Col>
                                        {/* Description block */}
                                        <Row>
                                            <Col>
                                                {/* <DescriptionBlock taxonomicService={taxonomicService} /> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
                        }
                        {/* If an error occurred */}
                        {errorMessage &&
                            <Row className="h-100">
                                <Col className="d-flex flex-column justify-content-center align-items-center">
                                    <Row>
                                        <Col>
                                            <p>{`An error occurred whilst searching for Taxonomic Service with ID: ${taxonomicServiceID}`}</p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <p>{errorMessage}</p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <p>
                                                Retry or go back to <Link to="/"
                                                    className="tc-primary"
                                                >
                                                    home
                                                </Link></p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            </Container >
            {/* Render Footer */}
            < Footer />
        </div >
    );
}

export default TaxonomicExpert;