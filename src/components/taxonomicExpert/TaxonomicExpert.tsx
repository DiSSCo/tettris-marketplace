/* Import Dependencies */
// import classNames from 'classnames';
// import { format } from 'date-fns';
// import { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';

// /* Import Hooks */
// import { useAppSelector, useAppDispatch, useFetch } from 'app/Hooks';

// /* Import Store */
// import { setIsApiOnline } from 'redux-store/AppStore';
// import { getTaxonomicService, setTaxonomicService } from 'redux-store/TaxonomicServiceSlice';

// /* Import Types */
// import { TaxonomicService as TaxonomicServiceType, Funder, Dict } from 'app/Types';

// /* Import API */
// import GetTaxonomicService from 'api/taxonomicService/GetTaxonomicService';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import { Container } from 'react-bootstrap';
// import { BreadCrumbs, Spinner } from 'components/general/CustomComponents';


const TaxonomicExpert = () => {
    /* Hooks */
    // const dispatch = useAppDispatch();
    // const params = useParams();
    // const fetch = useFetch();

    // /* Base variables */
    // const taxonomicService: TaxonomicServiceType | undefined = useAppSelector(getTaxonomicService);
    // const [errorMessage, setErrorMessage] = useState<string | undefined>();
    // const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);
    // const taxonomicServiceID: string = `${params.prefix}/${params.suffix}`;

    /* Fetch taxonomic service */
    // fetch.Fetch({
    //     Method: GetTaxonomicService,
    //     Handler: (taxonomicService: TaxonomicServiceType) => {
    //         dispatch(setTaxonomicService(taxonomicService));
    //         dispatch(setIsApiOnline(true));
    //     },
    //     ErrorHandler: (error: Error) => {
    //         setErrorMessage(error.message);

    //         if (error?.cause !== 200) {
    //             dispatch(setIsApiOnline(false));
    //         }
    //     },
    //     params: { handle: taxonomicServiceID }
    // });

    // /* Time out to check if the taxonomic service is still being loaded after 1.5 seconds */
    // setTimeout(() => {
    //     if (fetch.loading) {
    //         setDisplaySpinner(true);
    //     };
    // }, 1500);

    // /* ClassNames */
    // const detailBlocksClass = classNames({
    //     'pt-4': !taxonomicService?.taxonomicService['schema:AssociatedMedia']
    // });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1 overflow-hidden">
            </Container>
            {/* Render Footer */}
            < Footer />
        </div >
    );
}

export default TaxonomicExpert;