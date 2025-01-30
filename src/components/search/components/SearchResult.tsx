/* Import Dependencies */
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { format } from 'date-fns';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppDispatch } from 'app/Hooks';

/* Import Store */
import { setTaxonomicService } from 'redux-store/TaxonomicServiceSlice';
import { setTaxonomicExpert } from 'redux-store/TaxonomicExpertSlice';

/* Import Types */
import { TaxonomicExpert, TaxonomicService } from 'app/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';


/* Props Type */
type Props = {
    taxonomicService?: TaxonomicService
    taxonomicExpert?: TaxonomicExpert
};


/**
 * Component that renders an individual Search Result for on the search page
 * @param taxonomicService The Taxonomic Service that is represented by the Search Result
 * @returns JSX.Component
 */
const SearchResult = (props: Props) => {
    const { taxonomicService, taxonomicExpert } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

  

    if (taxonomicService)
    {
        /* Base variables */
        const logoImage: string | undefined = taxonomicService?.taxonomicService['schema:service']['schema:logo'];

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
            'd-none d-lg-none': !logoImage,
            'd-none d-lg-flex': logoImage
        });
        return (
            <div className={`${styles.searchResult} w-100 bgc-white mt-lg-1 pt-3 pb-2 px-3`}>
                <button type="button"
                    className="button-no-style"
                    onClick={() => SelectTaxonomicService(taxonomicService)}
                >
                    <Row className="h-100">
                        {/* Basic column with all the details */}
                        <Col lg={{ ...(logoImage && { span: 8 }) }} className="h-100 d-flex flex-column">
                            {/* Title and language if image is not present */}
                            <Row>
                                <Col xs lg={{ span: (!logoImage || window.innerWidth < 768) ? 9 : 12 }}>
                                    <p className="fs-4 fs-lg-default fw-bold textOverflow">{taxonomicService.taxonomicService['schema:service']['schema:name']}</p>
                                </Col>
                                
                                    <Col xs="auto" lg={{ span: 3 }}
                                        className={!logoImage ? 'd-lg-block' : 'd-lg-none'}
                                    >
                                        <p className="fw-bold fs-5 fs-lg-4 text-end textOverflow">{taxonomicService.taxonomicService['schema:availableLanguage']?.join(' / ').toUpperCase()}</p>
                                    </Col>
                                
                            </Row>
                            {/* Taxonomic range */}
                            <Row>
                                <Col>
                                    <p className="fs-5 fs-lg-4 fst-italic textOverflow">{taxonomicService.taxonomicService['schema:taxonomicRange']?.toString()}</p>
                                </Col>
                            </Row>
                            {/* Description */}
                            <Row className='flex-grow-1 my-2'>
                                <Col>
                                    <p className={`${styles.searchResultDescription} h-100 fs-4`}>{taxonomicService.taxonomicService['schema:service']['schema:description']}</p>
                                </Col>
                            </Row>
                            {/* Service Type and Publishing Date if preview image is not present */}
                            <Row>
                                <Col>
                                    <p className="fs-5 fs-lg-4">{taxonomicService.taxonomicService['schema:service']['schema:serviceType']}</p>
                                </Col>
                                <Col xs="auto" lg="auto"
                                    className={!logoImage ? 'd-lg-block' : 'd-lg-none'}
                                >
                                    <p className="fs-5 fs-lg-4 fw-bold">{taxonomicService.taxonomicService['schema:dateCreated'] &&
                                        format(taxonomicService.taxonomicService['schema:dateCreated'], 'MMM dd - yyyy')}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        {/* If preview image is present, render this additional column which takes over some details from the original one */}
                        <Col lg={{ span: 4 }}
                            className={`${imageColClass} h-100 flex-column`}
                        >
                            {/* Language */}
                            <Row className="flex-grow-1">
                                <Col className="d-flex justify-content-end">
                                    <p className="fw-bold fs-4">{taxonomicService.taxonomicService['schema:availableLanguage']?.join(' / ').toUpperCase()}</p>
                                </Col>
                            </Row>
                            {/* Logo, if present */}
                            {taxonomicService.taxonomicService['schema:service']['schema:logo'] &&
                                <Row>
                                    <Col>
                                        <div className="h-100 w-100 overflow-hidden">
                                            <img src={logoImage}
                                                alt={logoImage}
                                                className="h-100 w-100 object-fit-contain"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            }
                            {/* Publishing Date */}
                            <Row>
                                <Col className="d-flex justify-content-end">
                                    <p className="fw-bold fs-4">{taxonomicService.taxonomicService['schema:dateCreated'] &&
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
    else if (taxonomicExpert) {
        /* Base variables */
        const logoImage = "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";
        /**
         * Function for selecting a taxonomic Expert
         * @param taxonomicExpert The selected taxonomic Expert
         */
        const SelectTaxonomicExpert = (taxonomicExpert: TaxonomicExpert) => {
            /* Dispatch taxonomic expert to store */
            dispatch(setTaxonomicExpert(taxonomicExpert));

            /* Navigate to the taxonomic expert page */
            navigate(`/te/${taxonomicExpert.taxonomicExpert['@id'].replace(import.meta.env.VITE_HANDLE_URL as string, '')}`);
        }

        // const imageColClass = classNames({
        //     'd-none d-lg-none': !logoImage,
        //     'd-none d-lg-flex': logoImage
        // });

        return (<div className={`${styles.searchResult} w-100 bgc-white mt-lg-1 pt-3 pb-2 px-3`}>
            <button type="button"
                className="button-no-style"
                onClick={() => SelectTaxonomicExpert(taxonomicExpert)}
            >
                <Row className="h-100">
                    {/* Basic column with all the details */}
                        <Col lg={{ ...(logoImage && { span: 8 }) }} className="h-100 d-flex flex-column">
                        {/* Title and language if image is not present */}
                        <Row>
                            <Col xs lg={{ span: (window.innerWidth < 768) ? 9 : 12 }}>
                                <p className="fs-4 fs-lg-default fw-bold textOverflow">{taxonomicExpert.taxonomicExpert['name']}</p>
                            </Col>      
                            <Col xs="auto"
                                className={'d-lg-block'}
                            >
                                <p className="fw-bold fs-5 fs-lg-5 text-end textOverflow">{taxonomicExpert.taxonomicExpert['topDescription']}</p>
                            </Col>  
                        </Row>
                        {/* Taxomomic range */}
                        <Row>
                            <Col>
                                <p className="fs-5 fs-lg-4 fst-italic textOverflow">hymenoptera/bee</p>
                                <p className="fs-5 fs-lg-4 fst-italic textOverflow">hymenoptera/bee</p>
                                <p className="fs-5 fs-lg-4 fst-italic textOverflow">hymenoptera/bee</p>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <div className="h-70 w-70 overflow-hidden">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                                        alt="profile"
                                        className="h-100 w-100 object-fit-contain"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="fs-5 fs-lg-4">{taxonomicExpert.taxonomicExpert['languages']?.join(' / ').toUpperCase()}</p>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <p className="fs-5 fs-lg-4 fw-bold">Belgium</p>
                            </Col>
                        </Row>
                    </Col>
                    {/* If preview image is present, render this additional column which takes over some details from the original one */}
                    <Col lg={{ span: 4 }}
                        className={`h-100 flex-column`}
                    >
                        {/* Language */}
                        {/* <Row className="flex-grow-1">
                            <Col className="d-flex justify-content-end">
                                <p className="fw-bold fs-4">{taxonomicService.taxonomicService['schema:availableLanguage']?.join(' / ').toUpperCase()}</p>
                            </Col>
                        </Row> */}
                        {/* Publishing Date */}
                        {/* <Row>
                            <Col className="d-flex justify-content-end">
                                <p className="fw-bold fs-4">{taxonomicExpert.taxonomicService['schema:dateCreated'] &&
                                    format(taxonomicService.taxonomicService['schema:dateCreated'], 'MMMM dd - yyyy')
                                }</p>
                            </Col>
                        </Row> */}
                    </Col>
                </Row>
            </button>
        </div >);
    }
    else {
        return (<></>);
    }
}

export default SearchResult;