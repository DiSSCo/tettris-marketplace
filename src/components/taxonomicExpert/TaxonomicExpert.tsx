/* Import Dependencies */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row, } from 'react-bootstrap';

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
import DetailsBlock from './components/DetailsBlock';
import BioBlock from './components/BioBlock';


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


    const text = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc sit";
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
                                        <p className=' fs-lg-2 fw-bold'>{taxonomicExpert?.taxonomicExpert['schema:name']}</p>
                                    </Col>
                                    <Col>
                                        ORCID ID
                                    </Col>
                                    <Col>
                                        <p className=' fs-lg-2 fw-bold'>{taxonomicExpert?.taxonomicExpert['schema:location']}</p>
                                    </Col>
                                    <Col>
                                        <p className=' fs-lg-2 fw-bold'>{taxonomicExpert?.taxonomicExpert['schema:language']?.join(' / ').toUpperCase()}</p>
                                    </Col>
                                    <Col lg="auto" className="d-none d-lg-block">
                                        <Button type="submit" variant='tertiary'>
                                            <p>EMAIL</p>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={{ span: 2 }}>
                                        <img src="https://www.w3schools.com/images/picture.jpg" alt="John Doe" style={{ width: '100px', height: '100px' }} />
                                    </Col>
                                    <Col xs={{ span: 8 }}>
                                        <Row>
                                            <Col>
                                                <p>Headline Description</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>Institution</p>
                                            </Col>
                                            <Col>
                                                <p>URL</p>
                                            </Col>
                                            <Col>
                                                <p>ROR ID</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="flex-grow-1">
                                    <Col>
                                        <Row className="mb-3">
                                            <Col>
                                                <BioBlock name="Expert Bio" text={text}/>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col>
                                                <DetailsBlock name="Experience and qualifications" />
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col>
                                                <DetailsBlock name="Training Provision" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <DetailsBlock name="Taxonomic and research scope" />
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
                                                    className="tc-tertiary"
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