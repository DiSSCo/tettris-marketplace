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
            {taxonomicService.taxonomicService['schema:service']['schema:logo'] &&
                <Col lg={{ span: 1 }}
                    className="d-none d-lg-block"
                >
                    <Button type="button"
                        variant="blank"
                        className="px-0 py-0"
                        disabled={!taxonomicService.taxonomicService['schema:contactPoint']?.['schema:url']}
                        OnClick={() => window.open(`https://${taxonomicService.taxonomicService['schema:contactPoint']?.['schema:url']?.replace('http://', '').replace('https://', '')}`, '_blank', 'noopener')}
                    >
                        <img src={taxonomicService.taxonomicService['schema:service']['schema:logo']}
                            alt={taxonomicService.taxonomicService['schema:service']['schema:logo']}
                            className="w-100"
                        />
                    </Button>
                </Col>
            }
            {/* State and Title */}
            <Col xs={{ span: 12 }} lg="auto">
                <a href={`https://${taxonomicService.taxonomicService['schema:url']?.replace('http://', '').replace('https://', '')}`}
                    target='_blank'
                    rel="noreferer"
                >
                    <h1 className="fs-3 fs-lg-2 tc-primary-hover">{taxonomicService.taxonomicService['schema:service']['schema:name']}</h1>
                    <p className="fs-4 tc-grey">{`Persistent ID: ${taxonomicService.taxonomicService['@id']}`}</p>
                </a>
            </Col>
            {/* Apply for usage button */}
            <Col xs lg
                className="mt-3 mt-lg-0 d-flex justify-content-end"
            >
                <div>
                    <Button type="button"
                        variant="primary"
                        className="fs-5 fs-lg-4"
                        disabled={!taxonomicService.taxonomicService['schema:url']}
                        OnClick={() => window.open(`https://${taxonomicService.taxonomicService['schema:url']?.replace('http://', '').replace('https://', '')}`, '_blank', 'noopener')}
                    >
                        <p>
                            Go to E-Service
                        </p>
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

export default TopBar;