/* Import Dependencies */
import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

/* Import Sources */
import TaxonomicServiceFormJSON from 'sources/forms/TaxonomicServiceForm.json';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import FormBuilder from './taxonomicServiceFormComponents/FormBuilder';
import { BreadCrumbs } from 'components/general/CustomComponents';


/**
 * Component that renders the taxonomic service form
 * @returns JSX Component
 */
const TaxonomicServiceForm = () => {
    /* Base variables */
    const [completed, setCompleted] = useState<boolean>(false);

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col xs={{ span: 10, offset: 1 }}
                        lg={{ span: 6, offset: 3 }}
                        className="h-100 pt-4 pt-lg-5 pb-4 overflow-scroll"
                    >
                        <Row>
                            <Col>
                                <BreadCrumbs />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Card className="w-100 px-4 py-3">
                                    {/* Form title and description */}
                                    <Row>
                                        <Col>
                                            <h1 className="fs-2 tc-primary">
                                                {!completed ?
                                                    'Suggest a new taxonomic e-service'
                                                    : 'Submission received'
                                                }
                                            </h1>
                                            {!completed ?
                                                <p className="mt-3 fs-4">
                                                    Use this form to suggest new taxonomic e-services or tools that should be listed in the CETAF Marketplace.
                                                    Please fill in the required fields and add as much additional information as you can.
                                                    The CETAF secretariat will review and curate your submission before adding it to the marketplace.
                                                    To be accepted it needs to be a taxonomic tool or service and it needs to be of sufficient quality.
                                                    Please propose only services that are in production and maintained.
                                                </p>
                                                : <p className="mt-3 fs-4">
                                                    Your submission is received and will be processed by the Marketplace! A CETAF administrator will review
                                                    and score the taxonomic service. When the score is sufficient, the service will be published in the
                                                    Marketplace catalog.
                                                    <br />
                                                    Thank you for using the Taxonomic Marketplace!
                                                </p>
                                            }
                                        </Col>
                                    </Row>
                                    {/* Form content */}
                                    {!completed &&
                                        <Row>
                                            <Col>
                                                <FormBuilder formTemplate={TaxonomicServiceFormJSON}
                                                    SetCompleted={() => setCompleted(true)}
                                                />
                                            </Col>
                                        </Row>
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            < Footer />
        </div>
    );
};

export default TaxonomicServiceForm;