/* Import Dependencies */
import { Container, Row, Col, Card } from 'react-bootstrap';

/* Import Sources */
import TaxonomicServiceFormJSON from 'sources/forms/TaxonomicServiceForm.json';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import FormBuilder from './taxonomicServiceFormComponents/FormBuilder';


/**
 * Component that renders the taxonomic service form
 * @returns JSX Component
 */
const TaxonomicServiceForm = () => {
    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col lg={{ span: 6, offset: 3 }}
                        className="h-100 pt-5 pb-4 overflow-scroll"
                    >
                        <Card className="w-100 px-4 py-3">
                            {/* Form title and description */}
                            <Row>
                                <Col>
                                    <h1 className="fs-2 tc-primary">
                                        Suggest a new taxonomic e-service
                                    </h1>
                                    <p className="mt-3 fs-4">
                                        Use this form to suggest new taxonomic e-services or tools that should be listed in the CETAF Marketplace.
                                        Please fill in the required fields and add as much additional information as you can.
                                        The CETAF secretariat will review submissions and may alter your service description before adding
                                        it to the marketplace, or reject it if the suggested resource does not meet CETAF requirements of relevance and quality.
                                    </p>
                                </Col>
                            </Row>
                            {/* Form content */}
                            <Row>
                                <Col>
                                    <FormBuilder formTemplate={TaxonomicServiceFormJSON} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            < Footer />
        </div>
    );
};

export default TaxonomicServiceForm;