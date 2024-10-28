/* Import Dependencies */
import { Container, Row, Col, Modal, Form, Button, Collapse } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useRef, useState } from 'react';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import experts from './../../sources/dataModel/experts.json';

/* Import Icons */
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Component that renders the Expertise page
 * @returns JSX Component
 */
const Expertise = () => {
    const fieldsOfContries = [
        { value: "", label: "Select country" },
        { value: "Belgium", label: "Belgium" },
        { value: "USA", label: "United States" },
        { value: "Canada", label: "Canada" },
        { value: "Germany", label: "Germany" },
        { value: "France", label: "France" }
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

    const [expertsList, setExpertsList] = useState({ experts: experts.experts });
    const [index, setIndex] = useState(0);

    const countryRef = useRef<HTMLSelectElement>(null);
    const languageRef = useRef<HTMLSelectElement>(null);
    const taxonomyRef = useRef<HTMLSelectElement>(null);
    const subTaxonomyRef = useRef<HTMLSelectElement>(null);
    const orderRef = useRef<HTMLSelectElement>(null);

    const handleReset = (e: any) => {
        e.preventDefault();
        countryRef.current!.value = "";
        languageRef.current!.value = "";
        taxonomyRef.current!.value = "";
        subTaxonomyRef.current!.value = "";
        orderRef.current!.value = "";
        setExpertsList({ experts: experts.experts });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = {
            country: countryRef.current?.value,
            language: languageRef.current?.value,
            taxonomy: taxonomyRef.current?.value,
            subTaxonomy: subTaxonomyRef.current?.value,
            order: orderRef.current?.value,
        };
        console.log("Form data:", formData);
        const filteredExperts = experts.experts.filter((expert: any) => {
            return (
                (!formData.country || expert.country === formData.country) &&
                (!formData.language || expert.language === formData.language) &&
                (!formData.taxonomy || expert.scope === formData.taxonomy) &&
                (!formData.subTaxonomy || expert.subTaxonomy === formData.subTaxonomy)
            );
        });

        if (formData.order === "Ascendant") {
            filteredExperts.sort((a: any, b: any) => a.name.localeCompare(b.name));
        } else if (formData.order === "Descendant") {
            filteredExperts.sort((a: any, b: any) => b.name.localeCompare(a.name));
        }
        setIndex(0);
        setExpertsList({ experts: filteredExperts });
        // Further processing with formData if needed
    };

    const handleSearch = (e: any) => {
        const searchTerm = e.currentTarget.value.toLowerCase();
        const filteredExperts = experts.experts.filter((expert: any) => 
            expert.name.toLowerCase().includes(searchTerm) ||
            expert.description.toLowerCase().includes(searchTerm) ||
            expert.country.toLowerCase().includes(searchTerm) ||
            expert.scope.toLowerCase().includes(searchTerm)
        );
        setIndex(0);
        setExpertsList({ experts: filteredExperts });
    }

    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleToggle = () => setOpen(!open);


    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Expertise page body */}
            <Container fluid className="p-4">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1 className="fs-1 fw-bold">Browse taxonomic experts</h1>
                    <button type="button" className="btn btn-primary"  onClick={handleShow}>Register your expertise</button>
                </Col>
            </Container>
            <Container fluid className="flex-grow-1 p-3 overflow-auto">
                <Row className="h-100 flex-column flex-md-row">
                    <Col className='overflow-auto' md={3}>
                        <div className="border rounded p-3" style={{ backgroundColor: '#f2f2f2' }}>
                            <h2 className="fs-6">Filter Experts</h2>
                            {/* Mobile */}
                            <div className="d-md-none">
                                <Button
                                    onClick={handleToggle}
                                    aria-controls="filter-collapse"
                                    aria-expanded={open}
                                    className="mb-3"
                                >
                                    {open ? 'Hide Filters' : 'Show Filters'}
                                </Button>
                                <Collapse in={open}>
                                    <div id="filter-collapse">
                                        <Form onSubmit={handleSubmit} onReset={handleReset}>
                                            {SelectFields(fieldsOfContries, "Country", countryRef, "A country is a distinct territorial body or political entity that is recognized as an independent nation. Countries have defined geographical boundaries, governments, and often a population that shares common cultural, historical, or linguistic ties.")}
                                            {SelectFields(fieldsOfLanguages, "Language", languageRef, "A language is a structured system of symbols (like words or signs) that are used for communication. Each language has its own grammar, vocabulary, and pronunciation rules.")}
                                            {SelectFields(fieldsOfTaxonomy, "Taxonomy", taxonomyRef)}
                                            {SelectFields(fieldsOfSubTaxonomy, "Sub-taxonomy", subTaxonomyRef)}
                                            {SelectFields(fieldsOfOrder, "Order", orderRef)}
                                            <div className="d-flex justify-content-center">
                                                <Button type="reset" className="btn btn-primary">Reset</Button>
                                                <Button type="submit" className="btn btn-primary ms-2">Apply</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Collapse>
                            </div>
                            {/* Desktop */}
                            <div className="d-none d-md-block">
                                <Form onSubmit={handleSubmit} onReset={handleReset}>
                                    {SelectFields(fieldsOfContries, "Country", countryRef, "A country is a distinct territorial body or political entity that is recognized as an independent nation. Countries have defined geographical boundaries, governments, and often a population that shares common cultural, historical, or linguistic ties.")}
                                    {SelectFields(fieldsOfLanguages, "Language", languageRef, "A language is a structured system of symbols (like words or signs) that are used for communication. Each language has its own grammar, vocabulary, and pronunciation rules.")}
                                    {SelectFields(fieldsOfTaxonomy, "Taxonomy", taxonomyRef)}
                                    {SelectFields(fieldsOfSubTaxonomy, "Sub-taxonomy", subTaxonomyRef)}
                                    {SelectFields(fieldsOfOrder, "Order", orderRef)}
                                    <div className="d-flex justify-content-center">
                                        <Button type="reset" className="btn btn-primary">Reset</Button>
                                        <Button type="submit" className="btn btn-primary ms-2">Apply</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                    <Col className='overflow-auto'>
                        <Row className="align-items-center">
                            <Col>
                                <input type="text" className="form-control me-2" placeholder="Search experts" style={{ maxWidth: '300px' }} onInput={handleSearch}/>
                            </Col>
                            <Col>Result found {expertsList.experts.length}</Col>
                        </Row>
                        <Col className="overflow-auto flex-grow-1">
                            {Array.from({ length: Math.min(expertsList.experts.length - index, 5)}, (_, i) => (
                                <React.Fragment key={i + index}>
                                    {expertiseCard(expertsList.experts[i + index])}
                                </React.Fragment>
                            ))}
                        </Col>
                        {expertsList.experts.length > 5 && (
                            <Col className="d-flex justify-content-center p-3">
                                {index > 0 && <button type="button" className="btn btn-secondary me-2" onClick={() => setIndex(index - 5)}>Previous</button>}
                                {index + 5 < expertsList.experts.length && <button type="button" className="btn btn-secondary" onClick={() => setIndex(index + 5)}>Next</button>}
                                
                            </Col>
                        )}
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            <Footer />
            {/* Modal for registering expertise */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register Your Expertise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                        <Form.Group controlId='formCountry'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Enter your country" />
                        </Form.Group>
                        <Form.Group controlId="formLanguage">
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="text" placeholder="Enter your language" />
                        </Form.Group>
                        <Form.Group controlId="formTaxonomy">
                            <Form.Label>Taxonomy</Form.Label>
                            <Form.Control type="text" placeholder="Enter your taxonomy" />
                        </Form.Group>
                        <Form.Group controlId="formSubTaxonomy">
                            <Form.Label>Sub-Taxonomy</Form.Label>
                            <Form.Control type="text" placeholder="Enter your sub-taxonomy" />
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit">
                                Request
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Expertise;

function expertiseCard(expert: any) {
    return <Col className="border rounded p-3 mt-3"  style={{ backgroundColor: '#f2f2f2' }}>
        <Row>
            <Col><span className='fw-bold'>{expert.name}</span><span className='ms-3'>{expert.description}</span></Col>
            <Col></Col>
        </Row>
        <Row>
            <Col><p>{expert.status}</p></Col>
            <Col><p>{expert.scope}</p></Col>
            <Col><p>{expert.country}</p></Col>
        </Row>
    </Col>;
}

function SelectFields(fields: { value: string; label: string; }[], name: string, ref: React.RefObject<HTMLSelectElement>, info?: string) {
    return (
        <div className="mb-3">
            <Form.Label htmlFor={`${name}Field`} className="form-label">
                {name} {info && 
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`${name}Tooltip`}>{info}</Tooltip>}
                >
                <span><FontAwesomeIcon icon={faInfoCircle} /></span>
                </OverlayTrigger>
            }
            </Form.Label>
            <Form.Select ref={ref} className="form-select" id={`${name}Field`}>
                {fields.map((field) => (
                    <option key={field.value} value={field.value}>
                        {field.label}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
}
