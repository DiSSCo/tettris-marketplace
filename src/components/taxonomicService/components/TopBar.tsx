/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { TaxonomicService } from 'app/Types';


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
                <Col lg={{ span: 1 }}
                    className="d-none d-lg-block"
                >
                    <img src={taxonomicService.taxonomicService['schema:Service']['schema:logo']}
                        alt={taxonomicService.taxonomicService['schema:Service']['schema:logo']}
                        className="w-100"
                    />
                </Col>
            }
            {/* State and Title */}
            <Col xs={{ span: 12 }} lg="auto">
                <a href={`https://${taxonomicService.taxonomicService['schema:ContactPoint']?.['schema:url']?.replace('http://', '').replace('https://', '')}`}
                    target="_blank"
                    rel="noreferer"
                >
                    <h1 className="fs-3 fs-lg-2 tc-primary-hover">{taxonomicService.taxonomicService['schema:Service']['schema:name']}</h1>
                </a>
            </Col>
        </Row>
    );
}

export default TopBar;