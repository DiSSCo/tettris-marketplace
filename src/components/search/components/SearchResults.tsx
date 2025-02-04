/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getTaxonomicServices } from 'redux-store/TaxonomicServiceSlice';
import { getTaxonomicExperts } from 'redux-store/TaxonomicExpertSlice';

/* Import Components */
import SearchResult from './SearchResult';


/**
 * Component that renders the Search Results block on the Search page
 * @returns JSX.Component
 */
const SearchResults = () => {
    /* Base variables */
    const searchParams = new URLSearchParams(window.location.search);
    const serviceType = searchParams.get('serviceType') === 'taxonomicExpert' ? 'taxonomicExperts' : 'taxonomicServices';
    if (serviceType === 'taxonomicExperts')
    {
        const taxonomicExperts = useAppSelector(getTaxonomicExperts);

        return (
            <Row>
            {taxonomicExperts.map((taxonomicExpert) => (
                <Col key={taxonomicExpert.taxonomicExpert['@id']}
                    lg={{ span: 4 }}
                    className="mb-4"
                >
                    <SearchResult taxonomicExpert={taxonomicExpert} />
                </Col>
            ))}
            </Row>
        );
    }
    else {
        const taxonomicServices = useAppSelector(getTaxonomicServices);

        return (
            <Row>
                {taxonomicServices.map((taxonomicService) => (
                    <Col key={taxonomicService.taxonomicService['@id']}
                        lg={{ span: 4 }}
                        className="mb-4"
                    >
                        <SearchResult taxonomicService={taxonomicService} />
                    </Col>
                ))}
            </Row>
        );
    }
}

export default SearchResults;