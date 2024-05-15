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
        case 'published':
            stateTagLine = 'Published and visible';

            break;
        default:
            stateTagLine = 'Draft and hidden';

            break;
    }

    return (
        <Row>
            {/* State and Title */}
            <Col xs={{span: 12}} lg>
                <p className="fs-4 fs-lg-3">{stateTagLine}</p>
                <h1 className="fs-3 fs-lg-2">{taxonomicService.taxonomicService['erp:name']}</h1>
            </Col>
            {/* Apply for usage button */}
            <Col xs lg="auto"
                className="mt-3 mt-lg-0"
            >
                <Button type="button"
                    variant="primary"
                    className="fs-5 fs-lg-4"
                    OnClick={() => window.open(`https://${taxonomicService.taxonomicService['erp:helpdeskPage']?.replace('http://', '').replace('https://', '')}`, '_blank')}
                >
                    Apply for usage
                </Button>
            </Col>
        </Row>
    );
}

export default TopBar;