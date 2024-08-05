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

    return (
        <Row>
            {taxonomicService.taxonomicService['schema:Service']['schema:logo'] &&
                <Col lg={{ span: 1 }}>
                    <img src={taxonomicService.taxonomicService['schema:Service']['schema:logo']}
                        alt={taxonomicService.taxonomicService['schema:Service']['schema:logo']}
                        className="w-100"
                    />
                </Col>
            }
            {/* State and Title */}
            <Col xs={{ span: 12 }} lg>
                <h1 className="fs-3 fs-lg-2">{taxonomicService.taxonomicService['schema:Service']['schema:name']}</h1>
            </Col>
            {/* Apply for usage button */}
            <Col xs lg="auto"
                className="mt-3 mt-lg-0"
            >
                <Button type="button"
                    variant="primary"
                    className="fs-5 fs-lg-4"
                    disabled={!taxonomicService.taxonomicService['schema:ContactPoint']?.['schema:url']}
                    OnClick={() => window.open(`https://${taxonomicService.taxonomicService['schema:ContactPoint']?.['schema:url']?.replace('http://', '').replace('https://', '')}`, '_blank', 'noopener')}
                >
                    Apply for usage
                </Button>
            </Col>
        </Row>
    );
}

export default TopBar;