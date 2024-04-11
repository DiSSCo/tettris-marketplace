/* Import Dependencies */
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import { Button } from 'components/general/CustomComponents';


/** Component that renders the Top Bar of the Search page,
 * containing a title and the option to suggest new taxonomic services
*/
const TopBar = () => {
    /* Hooks */
    const navigate = useNavigate();

    return (
        <Row>
            <Col>
                <h1 className="fs-2 fw-lightBold">
                    Browse the catalog
                </h1>
            </Col>
            <Col className="col-lg-auto">
                <Button type="button"
                    variant="primary"
                    OnClick={() => navigate('/ts/add')}
                >
                    Suggest a new service
                </Button>
            </Col>
        </Row>
    );
}

export default TopBar;