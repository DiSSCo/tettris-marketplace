/* Import Dependencies */
import classNames from 'classnames';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Types */
import { TaxonomicService } from 'app/Types';

/* Import Styles */
import styles from 'components/taxonomicService/taxonomicService.module.scss';


/* Props Type */
type Props = {
    taxonomicService: TaxonomicService
};


/**
 * Component that renders the description block on the taxonomic service page
 * @param taxonomicService The chosen taxonomic service 
 * @returns JSX Component
 */
const DescriptionBlock = (props: Props) => {
    const { taxonomicService } = props;

    /* ClassNames */
    const descriptionBlockClass = classNames({
        [`${styles.descriptionBlock}`]: taxonomicService.taxonomicService['erp:multimedia']
    });

    const qualityScoreBarClass = classNames({
        'bgc-primary': true
    });

    return (
        <div className={descriptionBlockClass}>
            <Row className="h-100">
                {/* Preview image, if available */}
                {taxonomicService.taxonomicService['erp:multimedia']?.length &&
                    <Col xs={{ span: 12 }} lg={{ span: 3 }}
                        className="h-100 bgc-white me-3 mb-3 mb-lg-0"
                    >
                        <div className={`${styles.imageBackground} h-100 w-100 d-flex justify-content-center `}>
                            <img src={taxonomicService.taxonomicService['erp:multimedia'][0]['erp:multimediaUrl']}
                                alt={taxonomicService.taxonomicService['erp:multimedia'][0]['erp:multimediaUrl']}
                                className="h-100"
                            />
                        </div>
                    </Col>
                }
                {/* Description information */}
                <Col className="h-100 d-flex flex-column">
                    {/* Tyoe, taxonomic scope, language, publishing date and quality score */}
                    <Row className="justify-content-between">
                        {/* Type */}
                        <Col xs={{ span: 12 }} lg="auto">
                            <p className="fs-5 fw-bold">Taxonomic service type</p>
                            <p className="tc-primary fw-bold">{MakeReadableString(taxonomicService.taxonomicService['cetaf:taxonomicServiceType'])}</p>
                        </Col>
                        {/* Taxonomic scope */}
                        <Col xs={{ span: 12 }} lg="auto"
                            className="mt-2 mt-lg-0"
                        >
                            <p className="fs-5 fw-bold">Taxonomic scope</p>
                            <p>{taxonomicService.taxonomicService['cetaf:taxonomicScope']?.join(' / ')}</p>
                        </Col>
                        {/* Languages */}
                        <Col xs={{ span: 12 }} lg="auto"
                            className="mt-2 mt-lg-0"
                        >
                            <p className="fs-5 fw-bold">Supporting languages</p>
                            <p>{taxonomicService.taxonomicService['erp:languageAvailabilities'].join(' / ')}</p>
                        </Col>
                        {/* Publishing date */}
                        <Col xs={{ span: 12 }} lg="auto"
                            className="mt-2 mt-lg-0"
                        >
                            <p className="fs-5 fw-bold">Publishing date</p>
                            <p>{moment(taxonomicService.taxonomicService['ods:created']).format('MMM DD - YYYY')}</p>
                        </Col>
                        {/* Quality score */}
                        <Col xs={{ span: 12 }} lg={{ span: 3 }}
                            className="mt-3 mt-lg-0 py-1"
                        >
                            <div className="position-relative h-100 d-flex align-items-center bgc-grey-light">
                                <p className="position-relative w-100 text-center fs-4 fw-lightBold z-2">Quality score</p>

                                <div className={`${qualityScoreBarClass} position-absolute h-100 top-0 z-1`}
                                    style={{ width: `${taxonomicService.taxonomicService['cetaf:qualityScore']}%` }}
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* Description */}
                    <Row className="flex-grow-1 mt-3 mt-lg-4">
                        <Col className="h-100 d-flex flex-column">
                            <p className="fs-4 fs-lg-default fw-bold">Description</p>

                            <div className="flex-grow-1 mt-1 overflow-scroll">
                                <p className="fs-4">{taxonomicService.taxonomicService['erp:description']}</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default DescriptionBlock;