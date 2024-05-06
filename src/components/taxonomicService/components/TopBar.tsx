/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { TaxonomicService } from 'app/Types';

/* Import Components */
import { Button } from 'components/general/CustomComponents';


/* Props Type */
type Props = {
    taxonomicService: TaxonomicService
};


/**
 * Component that renders the Top Bar of the Taxonomic Service page
 * @param taxonomicService The chosen Taxonomic Service
 * @returns JSX Component
 */
const TopBar = (props: Props) => {
    const { taxonomicService } = props;
    let stateTagLine: string;

    /* Define the state tag line */
    switch(taxonomicService.taxonomicService['cetaf:state']) {
        case 'accepted':
            stateTagLine = 'Published and visible';

            break;
        case 'rejected':
            stateTagLine = 'Rejected and hidden'

            break;
        default:
            stateTagLine = 'Proposed and hidden';

            break;
    }

    return (
        <Row>
            {/* State and Title */}
            <Col>
                <p className="fs-3">{stateTagLine}</p>
                <h1 className="fs-2">{taxonomicService.taxonomicService['erp:name']}</h1>
            </Col>
            {/* Apply for usage button */}
            <Col className="col-lg-auto">
                <Button type="button"
                    variant="primary"
                    OnClick={() => {}}
                >
                    Apply for usage
                </Button>
            </Col>
        </Row>
    );
}

export default TopBar;