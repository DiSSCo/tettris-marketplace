/* Import Dependencies */
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { format } from 'date-fns';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppDispatch } from 'app/Hooks';

/* Import Store */
import { setTaxonomicService } from 'redux-store/TaxonomicServiceSlice';

/* Import Types */
import { TaxonomicService } from 'app/Types';

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

    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const previewImage: string | undefined = taxonomicService.taxonomicService['schema:AssociatedMedia']?.[0]?.['schema:contentUrl'];

    /**
     * Function for selecting a taxonomic service
     * @param taxonomicService The selected taxonomic service
     */
    const SelectTaxonomicService = (taxonomicService: TaxonomicService) => {
        /* Dispatch taxonomic service to store */
        dispatch(setTaxonomicService(taxonomicService));

        /* Navigate to the taxonomic service page */
        navigate(`/ts/${taxonomicService.taxonomicService['@id'].replace(import.meta.env.VITE_HANDLE_URL as string, '')}`);
    }

    /* ClassNames */
    const imageColClass = classNames({
        'd-none d-lg-none': !previewImage,
        'd-none d-lg-flex': previewImage
    });

    return (
        <div className={`${styles.searchResult} w-100 bgc-white mt-lg-1 pt-3 pb-2 px-3`}>
            <button type="button"
                className="button-no-style"
                onClick={() => SelectTaxonomicService(taxonomicService)}
            >
                <Row className="h-100">
                    {/* Basic column with all the details */}
                    <Col className="h-100 d-flex flex-column">
                        {/* Title and language if image is not present */}
                        <Row>
                            <Col lg={{ span: (!previewImage || window.innerWidth < 768) ? 9 : 12 }}>
                                <p className="fs-4 fs-lg-default fw-bold textOverflow">{taxonomicService.taxonomicService['schema:Service']['schema:name']}</p>
                            </Col>
                            {(!previewImage || window.innerWidth < 768) &&
                                <Col xs="auto" lg={{ span: 3 }}

                                >
                                    <p className="fw-bold fs-5 fs-lg-4 text-end textOverflow">{taxonomicService.taxonomicService['schema:availableLanguage']?.join(' / ').toUpperCase()}</p>
                                </Col>
                            }
                        </Row>
                        {/* Taxomomic range */}
                        <Row>
                            <Col>
                                <p className="fs-5 fs-lg-4 fst-italic textOverflow">{taxonomicService.taxonomicService['schema:taxonomicRange']?.toString()}</p>
                            </Col>
                        </Row>
                        {/* Description */}
                        <Row className='flex-grow-1 my-2'>
                            <Col>
                                <p className={`${styles.searchResultDescription} h-100 fs-4`}>{taxonomicService.taxonomicService['schema:Service']['schema:description']}</p>
                            </Col>
                        </Row>
                        {/* Service Type and Publishing Date if preview image is not present */}
                        <Row>
                            <Col>
                                <p className="fs-5 fs-lg-4">{taxonomicService.taxonomicService['schema:Service']['schema:serviceType']}</p>
                            </Col>
                            {(!previewImage || window.innerWidth < 768) &&
                                <Col xs="auto" lg="auto">
                                    <p className="fs-5 fs-lg-4 fw-bold">{taxonomicService.taxonomicService['schema:dateCreated'] &&
                                        format(taxonomicService.taxonomicService['schema:dateCreated'], 'MMMM dd - yyyy')}
                                    </p>
                                </Col>
                            }
                        </Row>
                    </Col>
                    {/* If preview image is present, render this additional column which takes over some details from the original one */}
                    <Col lg={{ span: 4 }}
                        className={`${imageColClass} h-100 flex-column`}
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
                                <p className="tc-white fw-bold fs-4">{taxonomicService.taxonomicService['schema:availableLanguage']?.join(' / ').toUpperCase()}</p>
                            </Col>
                        </Row>
                        {/* Publishing Date */}
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <p className="tc-white fw-bold fs-4">{taxonomicService.taxonomicService['schema:dateCreated'] &&
                                    format(taxonomicService.taxonomicService['schema:dateCreated'], 'MMMM dd - yyyy')
                                }</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </button>
        </div >
    );
}

export default SearchResult;