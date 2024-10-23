/* Import Dependencies */
import classNames from 'classnames';
import moment from 'moment';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useFetch } from 'app/Hooks';

/* Import Store */
import { setIsApiOnline } from 'redux-store/AppStore';
import { getTaxonomicService, setTaxonomicService } from 'redux-store/TaxonomicServiceSlice';

/* Import Types */
import { TaxonomicService as TaxonomicServiceType } from 'app/Types';

/* Import Components */
import Header from 'components/general/header/Header';
import TopBar from './components/TopBar';
import DescriptionBlock from './components/DescriptionBlock';
import DetailsBlock from './components/DetailsBlock';
import MultimediaBlock from './components/MultimediaBlock';
import Footer from 'components/general/footer/Footer';
import { Button, Spinner } from 'components/general/CustomComponents';

/* Import API */
import GetTaxonomicService from 'api/taxonomicService/GetTaxonomicService';


const TaxonomicService = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const fetch = useFetch();

    /* Base variables */
    const taxonomicService: TaxonomicServiceType | undefined = useAppSelector(getTaxonomicService);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);
    const taxonomicServiceID: string = `${params.prefix}/${params.suffix}`;

    /* Fetch taxonomic service */
    fetch.Fetch({
        Method: GetTaxonomicService,
        Handler: (taxonomicService: TaxonomicServiceType) => {
            dispatch(setTaxonomicService(taxonomicService));
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

    /* Time out to check if the taxonomic service is still being loaded after 1.5 seconds */
    setTimeout(() => {
        if (fetch.loading) {
            setDisplaySpinner(true);
        };
    }, 1500);

    /* ClassNames */
    const detailBlocksClass = classNames({
        'pt-4': !taxonomicService?.taxonomicService['schema:AssociatedMedia']
    });
    
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
                        {/* If taxonomic service is present */}
                        {taxonomicService &&
                            <>
                                {/* MOBILE: Back to search button */}
                                <Row className="d-lg-none">
                                    <Col>
                                        <Button type="button"
                                            variant="blank"
                                            className="px-0"
                                            OnClick={() => navigate(-1)}
                                        >
                                            {`< Back to search`}
                                        </Button>
                                    </Col>
                                </Row>
                                {/* Top bar */}
                                <Row className="mt-3 pt-lg-0">
                                    <Col>
                                        <TopBar taxonomicService={taxonomicService} />
                                    </Col>
                                </Row>
                                {/* Scrollable content */}
                                <Row className="flex-grow-1 overflow-scroll mt-3 mb-3">
                                    <Col>
                                        {/* Description block */}
                                        <Row>
                                            <Col>
                                                <DescriptionBlock taxonomicService={taxonomicService} />
                                            </Col>
                                        </Row>
                                        {/* Detail blocks */}
                                        <Row className={`${detailBlocksClass} mt-4`}>
                                            <Col xs={{ span: 12 }}
                                                lg={{ span: 3 }}
                                            >
                                                <DetailsBlock name="Service Details"
                                                    properties={{
                                                        topicDiscipline: taxonomicService.taxonomicService['ods:topicDiscipline'],
                                                        geographicArea: taxonomicService.taxonomicService['schema:geographicArea'],
                                                        licence: taxonomicService.taxonomicService['schema:license'],
                                                        datePublished: moment(taxonomicService.taxonomicService['schema:datePublished']).format('MMM DD - YYYY'),
                                                        paymentModel: taxonomicService.taxonomicService['schema:additionalProperty']?.[2].value as string,
                                                        fundingProgram: taxonomicService.taxonomicService['schema:FundingScheme']?.['schema:Funding']?.['schema:identifier']
                                                    }}
                                                />
                                            </Col>
                                            <Col xs={{ span: 12 }}
                                                lg={{ span: 3 }}
                                                className="mt-4 mt-lg-0"
                                            >
                                                <DetailsBlock name="Contact Information"
                                                    properties={{
                                                        contactEmail: taxonomicService.taxonomicService['schema:ContactPoint']?.['schema:email'],
                                                        contactWebpage: taxonomicService.taxonomicService['schema:ContactPoint']?.['schema:url'],
                                                        webpage: taxonomicService.taxonomicService['schema:ContactPoint']?.['schema:url'],
                                                        documentationWebpage: taxonomicService.taxonomicService['schema:documentation'],
                                                        maintainers: taxonomicService.taxonomicService['schema:Maintainer']
                                                    }}
                                                />
                                            </Col>
                                            {/* Show software details if software object is present in taxonomic service */}
                                            {taxonomicService.taxonomicService['schema:SoftwareSourceCode'] &&
                                                <Col xs={{ span: 12 }}
                                                    lg={{ span: 3 }}
                                                    className="mt-4 mt-lg-0"
                                                >
                                                    <DetailsBlock name="Software"
                                                        properties={{
                                                            codeRepository: taxonomicService.taxonomicService['schema:SoftwareSourceCode']['schema:codeRepository'],
                                                            runtimePlatform: taxonomicService.taxonomicService['schema:SoftwareSourceCode']['schema:runtimePlatform'],
                                                            status: taxonomicService.taxonomicService['schema:SoftwareSourceCode']['schema:creativeWorkStatus'],
                                                            changeLog: taxonomicService.taxonomicService['schema:about'],
                                                            programmingLanguages: taxonomicService.taxonomicService['schema:SoftwareSourceCode']['schema:programmingLanguage']
                                                        }}
                                                    />
                                                </Col>
                                            }
                                            {/* Show multimedia block, if multimedia is present */}
                                            {taxonomicService.taxonomicService['schema:AssociatedMedia'] &&
                                                <Col xs={{ span: 12 }} lg
                                                    className="mt-4 mt-lg-0"
                                                >
                                                    <MultimediaBlock multimediaItems={taxonomicService.taxonomicService['schema:AssociatedMedia']} />
                                                </Col>
                                            }
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

export default TaxonomicService;