/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import React, { useState } from 'react';
import { set } from 'lodash';


/**
 * Component that renders the Expertise page
 * @returns JSX Component
 */
const Expertise = () => {
    const fieldsOfContries = [
        { value: "", label: "Select country" },
        { value: "be", label: "Belgium" },
        { value: "usa", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "germany", label: "Germany" },
        { value: "france", label: "France" }
    ];
    const fieldsOfLanguages = [
        { value: "", label: "Select language" },
        { value: "en", label: "English" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
    ];
    const fieldsOfTaxonomy = [
        { value: "", label: "Select taxonomy" },
        { value: "biology", label: "Biology" },
        { value: "chemistry", label: "Chemistry" },
        { value: "physics", label: "Physics" },
    ];
    const fieldsOfSubTaxonomy = [
        { value: "", label: "Select sub-taxonomy" },
        { value: "biology", label: "Biology" },
        { value: "chemistry", label: "Chemistry" },
        { value: "physics", label: "Physics" },
    ];
    const fieldsOfOrder = [
        { value: "", label: "Select order" },
        { value: "Descendant", label: "Descendant" },
        { value: "Ascendant", label: "Ascendant" },
    ];
    
    let result = 25;
    const [index, setIndex] = useState(0);

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Expertise page body */}
            <Container fluid className="overflow-hidden p-4">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1 className="fs-1 fw-bold">Browse taxonomic experts</h1>
                    <button type="button" className="btn btn-primary">Register your expertise</button>
                </Col>
            </Container>
            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col md={3}>
                        <div className="border rounded p-3" style={{ backgroundColor: '#f2f2f2' }}>
                            <h2 className="fs-6">Filter Experts</h2>
                            <form>
                                {SelectFields(fieldsOfContries, "Country", "A country is a distinct territorial body or political entity that is recognized as an independent nation. Countries have defined geographical boundaries, governments, and often a population that shares common cultural, historical, or linguistic ties.")}
                                {SelectFields(fieldsOfLanguages, "Language", "A language is a structured system of symbols (like words or signs) that are used for communication. Each language has its own grammar, vocabulary, and pronunciation rules.")}
                                {SelectFields(fieldsOfTaxonomy, "Taxonomy")}
                                {SelectFields(fieldsOfSubTaxonomy, "Sub-taxonomy")}
                                {SelectFields(fieldsOfOrder, "Order")}
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary">Apply</button>
                                </div>
                            </form>
                        </div>
                    </Col>
                    <Col>
                        <Row className="align-items-center">
                            <Col><input type="text" className="form-control me-2" placeholder="Search experts" style={{ maxWidth: '300px' }} /></Col>
                            <Col>Result found {result}</Col>
                        </Row>
                        <Col className="overflow-auto flex-grow-1">
                            {Array.from({ length: Math.min(result - index, 5)}, (_, i) => (
                                <React.Fragment key={i + index}>
                                    {expertiseCard(i + index)}
                                </React.Fragment>
                            ))}
                        </Col>
                        {result > 5 && (
                            <Col className="d-flex justify-content-center p-3">
                                {index > 0 && <button type="button" className="btn btn-secondary me-2" onClick={() => setIndex(index - 5)}>Previous</button>}
                                {index + 5 < result && <button type="button" className="btn btn-secondary" onClick={() => setIndex(index + 5)}>Next</button>}
                                
                            </Col>
                        )}
                    </Col>
                </Row>
            </Container>
            
            {/* Render Footer */}
            <Footer />
        </div>
    );
}

export default Expertise;

function expertiseCard(i: number) {
    return <Col className="border rounded p-3 mt-3"  style={{ backgroundColor: '#f2f2f2' }}>
        <Row>
            <Col><span className='fw-bold'>Expert {i + 1}</span><span className='ms-3'>headline sentence describing expertise</span></Col>
            <Col></Col>
        </Row>
        <Row>
            <Col><p>Professional Status</p></Col>
            <Col><p>Taxonomic scope</p></Col>
            <Col><p>Country</p></Col>
        </Row>
    </Col>;
}

function SelectFields(fieldsOfContries: { value: string; label: string; }[], name: string, info?: string) {
    return (
        <div className="mb-3">
            <label htmlFor={`${name}Field`} className="form-label">
                {name} {info && 
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`${name}Tooltip`}>{info}</Tooltip>}
                >
                <span>(i)</span>
                </OverlayTrigger>
            }
            </label>
            <select className="form-select" id={`${name}Field`}>
                {fieldsOfContries.map((field) => (
                    <option key={field.value} value={field.value}>
                        {field.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
