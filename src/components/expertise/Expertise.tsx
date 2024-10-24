/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';


/**
 * Component that renders the Expertise page
 * @returns JSX Component
 */
const Expertise = () => {
    const fieldsOfContries = [
        { value: "", label: "Select country" },
        { value: "usa", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "germany", label: "Germany" },
        { value: "france", label: "France" }
    ];
    const fieldsOfLanguages = [
        { value: "", label: "Select language" },
        { value: "english", label: "English" },
        { value: "spanish", label: "Spanish" },
        { value: "french", label: "French" },
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
    
    let result = 0;

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
                        <div className="border rounded p-3">
                            <h2 className="fs-6">Filter Experts</h2>
                            <form>
                                {SelectFields(fieldsOfContries, "Country")}
                                {SelectFields(fieldsOfLanguages, "Language")}
                                {SelectFields(fieldsOfTaxonomy, "Taxonomy")}
                                {SelectFields(fieldsOfSubTaxonomy, "Sub-taxonomy")}
                                {SelectFields(fieldsOfOrder, "Order")}
                                <button type="submit" className="btn btn-primary">Apply</button>
                            </form>
                        </div>
                    </Col>
                    <Col>
                        <Row className="align-items-center">
                            <Col><input type="text" className="form-control me-2" placeholder="Search experts" style={{ maxWidth: '300px' }} /></Col>
                            <Col>Result found {result}</Col>
                        </Row>
                        <Col className="overflow-auto flex-grow-1">
                            {expertiseCard()}
                            {expertiseCard()}
                            {expertiseCard()}
                            {expertiseCard()}
                            {expertiseCard()}
                        </Col>
                        <Col className="d-flex justify-content-center mt-3">
                            <button type="button" className="btn btn-secondary me-2">Previous</button>
                            <button type="button" className="btn btn-secondary">Next</button>
                        </Col>
                    </Col>
                </Row>
            </Container>
            {/* Render Footer */}
            <Footer />
        </div>
    );
}

export default Expertise;

function expertiseCard() {
    return <Col>
        <div className="border rounded p-3 mt-3">
            <h2 className="fs-6">Expert 1   headline sentence describing expertise</h2>
            <p>Professional Status | Taxonomic scope | Contry</p>
        </div>
    </Col>;
}

function SelectFields(fieldsOfContries: { value: string; label: string; }[], name: string) {
    return <div className="mb-3">
        <label htmlFor={`${name}Field`} className="form-label">{name} (i)</label>
        <select className="form-select" id={`${name}Field`}>
            {fieldsOfContries.map((field) => (
                <option key={field.value} value={field.value}>
                    {field.label}
                </option>
            ))}
        </select>
    </div>;
}
