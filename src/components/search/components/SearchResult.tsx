/* Import Dependencies */
import classNames from 'classnames';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Types */
import { TaxonomicService } from "app/types/TaxonomicService";

/* Import Styles */
import styles from 'components/search/search.module.scss';


/* Props Type */
type Props = {
    taxonomicService: TaxonomicService
};


/**
 * Component that renders an individual Search Result for on the search page
 * @param taxonomicService The Taxonomic Service that is represented by the Search Result
 * @returns JSX.Component
 */
const SearchResult = (props: Props) => {
    const { taxonomicService } = props;

    /* Base variables */
    const previewImage: string | undefined = taxonomicService.associatedMedia?.[0]?.url;

    /* ClassNames */
    const imageColClass = classNames({
        'd-none': !previewImage,
        'd-block': previewImage
    });

    return (
        <div className={`${styles.searchResult} w-100 bgc-white mt-1 pt-3 pb-2 px-3`}>
            <Row className="h-100">
                {/* Basic column with all the details */}
                <Col className="h-100 d-flex flex-column">
                    {/* Title and language if image is not present */}
                    <Row>
                        <Col>
                            <p className="fw-bold">{taxonomicService.title}</p>
                            <p className="fs-4 fst-italic">{taxonomicService.taxonomicScope?.toString()}</p>
                        </Col>
                        {!previewImage &&
                            <Col className="col-lg-auto">
                                <p className="fw-bold fs-4">{taxonomicService.language?.toUpperCase()}</p>
                            </Col>
                        }
                    </Row>
                    {/* Description */}
                    <Row className='flex-grow-1 my-2'>
                        <Col>
                            <p className={`${styles.searchResultDescription} h-100 fs-4`}>{taxonomicService.description}</p>
                        </Col>
                    </Row>
                    {/* Service Type and Publishing Date if preview image is not present */}
                    <Row>
                        <Col>
                            <p className="fs-4">{MakeReadableString(taxonomicService.serviceCategory ?? 'Taxonomic Service')}</p>
                        </Col>
                        {!previewImage &&
                            <Col className="col-lg-auto">
                                <p className="fs-4 fw-bold">{moment(taxonomicService['ods:created']).format('MMM DD - YYYY')}</p>
                            </Col>
                        }
                    </Row>
                </Col>
                {/* If preview image is present, render this additional column which takes over some details from the original one */}
                <Col lg={{ span: 4 }}
                    className={`${imageColClass} h-100 d-flex flex-column`}
                    style={{
                        backgroundImage: `Url(${previewImage})`,
                        backgroundColor: '#333333',
                        backgroundBlendMode: 'difference',
                        filter: 'contrast(1.2)',
                        backgroundSize: 'cover',
                        backgroundPosition: '0%'
                    }}
                >
                    {/* Language */}
                    <Row className="flex-grow-1">
                        <Col className="d-flex justify-content-end">
                            <p className="tc-white fw-bold fs-4">{taxonomicService.language?.toUpperCase()}</p>
                        </Col>
                    </Row>
                    {/* Publishing Date */}
                    <Row>
                        <Col className="d-flex justify-content-end">
                            <p className="tc-white fw-bold fs-4">{moment(taxonomicService['ods:created']).format('MMM DD - YYYY')}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div >
    );
}

export default SearchResult;