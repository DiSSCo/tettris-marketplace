/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getTaxonomicServices } from 'redux-store/TaxonomicServiceSlice';

/* Import Components */
import SearchResult from './SearchResult';


/**
 * Component that renders the Search Results block on the Search page
 * @returns JSX.Component
 */
const SearchResults = () => {
    /* Base variables */
    const taxonomicServices = useAppSelector(getTaxonomicServices);

    return (
        <Row>
            {taxonomicServices.map((taxonomicService) => (
                <Col key={taxonomicService.taxonomicService['erp:id']}
                    lg={{ span: 4 }}
                    className="mb-4"
                >
                    <SearchResult taxonomicService={taxonomicService} />
                </Col>
            ))}
        </Row>
    );
}

export default SearchResults;