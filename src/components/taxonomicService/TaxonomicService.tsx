/* Import Dependencies */
import classNames from 'classnames';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useFetch } from 'app/Hooks';

/* Import Store */
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
import { Spinner } from 'components/general/CustomComponents';

/* Import API */
import GetTaxonomicService from 'api/taxonomicService/GetTaxonomicService';


const TaxonomicService = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const fetch = useFetch();

    /* Base variables */
    const taxonomicService: TaxonomicServiceType | undefined = useAppSelector(getTaxonomicService);
    const taxonomicServiceID: string = `${params.prefix}/${params.suffix}`;

    if (!taxonomicService || taxonomicService.taxonomicService['erp:id'] !== taxonomicServiceID.replace(process.env.REACT_APP_HANDLE_URL as string, '')) {
        fetch.Fetch({
            Method: GetTaxonomicService,
            Handler: (taxonomicService: TaxonomicServiceType) => dispatch(setTaxonomicService(taxonomicService)),
            params: { handle: taxonomicServiceID }
        });
    }

    /* ClassNames */
    const detailBlocksClass = classNames({
        'pt-4': !taxonomicService?.taxonomicService['erp:multimedia']
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column pt-5 px-4 px-lg-3"
                    >
                        {/* If data is still being loaded after 1.5 seconds, display spinner */}
                        {fetch.loading &&
                            <>
                                {setTimeout(() => {
                                    return (
                                        <Row className="flex-grow-1">
                                            <Col className="d-flex justify-content-center align-items-center">
                                                <div className="text-center">
                                                    <p className="fs-2 fw-lightBold pb-2">Loading Taxonomic Service</p>
                                                    <Spinner />
                                                </div>
                                            </Col>
                                        </Row>
                                    );
                                }, 1500)}
                            </>
                        }
                        {/* If taxonomic service is present */}
                        {taxonomicService &&
                            <>
                                {/* Top bar */}
                                <Row>
                                    <Col>
                                        <TopBar taxonomicService={taxonomicService} />
                                    </Col>
                                </Row>
                                {/* Scrollable content */}
                                <Row className="flex-grow-1 overflow-scroll mt-4 mb-3">
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
                                                        category: taxonomicService.taxonomicService['erp:category'],
                                                        license: taxonomicService.taxonomicService['dcterms:license'],
                                                        version: taxonomicService.taxonomicService['erp:version'],
                                                        lastUpdated: moment(taxonomicService.taxonomicService['erp:lastUpdate']).format('MMM DD - YYYY'),
                                                        paymentModel: taxonomicService.taxonomicService['erp:paymentModel'],
                                                        fundingProgram: taxonomicService.taxonomicService['erp:fundingProgram']
                                                    }}
                                                />
                                            </Col>
                                            <Col xs={{ span: 12 }}
                                                lg={{ span: 3 }}
                                                className="mt-4 mt-lg-0"
                                            >
                                                <DetailsBlock name="Contact Information"
                                                    properties={{
                                                        helpdeskEmail: taxonomicService.taxonomicService['erp:helpdeskEmail'],
                                                        helpdeskWebPage: taxonomicService.taxonomicService['erp:helpdeskPage'],
                                                        webpage: taxonomicService.taxonomicService['erp:webpage'],
                                                        documentationWebPage: taxonomicService.taxonomicService['cetaf:documentationUrl'],
                                                        agents: taxonomicService.taxonomicService['cetaf:agents']
                                                    }}
                                                />
                                            </Col>
                                            {/* Show software details if software object is present in taxonomic service */}
                                            {taxonomicService.taxonomicService['cetaf:software'] &&
                                                <Col xs={{ span: 12 }}
                                                    lg={{ span: 3 }}
                                                    className="mt-4 mt-lg-0"
                                                >
                                                    <DetailsBlock name="Software"
                                                        properties={{
                                                            sourceUrl: taxonomicService.taxonomicService['cetaf:software']['cetaf:sourceUrl'],
                                                            requiredResources: taxonomicService.taxonomicService['cetaf:software']['erp:requiredResources'],
                                                            status: taxonomicService.taxonomicService['cetaf:software']['cetaf:deprecated'] ? 'Deprecated' : 'Maintained',
                                                            changeLog: taxonomicService.taxonomicService['cetaf:software']['erp:changeLog']
                                                        }}
                                                    />
                                                </Col>
                                            }
                                            {/* Show multimedia block, if multimedia is present */}
                                            {taxonomicService.taxonomicService['erp:multimedia'] &&
                                                <Col xs={{ span: 12 }} lg
                                                    className="mt-4 mt-lg-0"
                                                >
                                                    <MultimediaBlock multimediaItems={taxonomicService.taxonomicService['erp:multimedia']} />
                                                </Col>
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                            </>
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