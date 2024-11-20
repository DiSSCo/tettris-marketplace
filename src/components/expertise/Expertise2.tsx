/* Import Dependencies */
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import experts from '../../sources/dataModel/experts.json';
import AvatarLogo from 'webroot/img/avatar.png';

/* Import Icons */
import { useNavigate } from 'react-router-dom';
/**
 * Component that renders the Expertise page
 * @returns JSX Component
 */
const Expertise2 = () => {
    const fieldsOfContries = [
        { value: "", label: "country" },
        { value: "Belgium", label: "Belgium" },
        { value: "USA", label: "United States" },
        { value: "Canada", label: "Canada" },
        { value: "Germany", label: "Germany" },
        { value: "France", label: "France" }
    ];
    const fieldsOfLanguages = [
        { value: "", label: "language" },
        { value: "en", label: "English" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
    ];
    const fieldsOfTaxonomy = [
        { value: "", label: "taxonomy" },
        { value: "biology", label: "Biology" },
        { value: "chemistry", label: "Chemistry" },
        { value: "physics", label: "Physics" },
    ];
    const fieldsOfSubTaxonomy = [
        { value: "", label: "sub-taxonomy" },
        { value: "biology", label: "Biology" },
        { value: "chemistry", label: "Chemistry" },
        { value: "physics", label: "Physics" },
    ];
    const fieldsOfResarch = [
        { value: "", label: "research" },
        { value: "biology", label: "Biology" },
        { value: "chemistry", label: "Chemistry" },
        { value: "physics", label: "Physics" },
    ];
    const fieldsOfOrder = [
        { value: "", label: "order" },
        { value: "Descendant", label: "Descendant" },
        { value: "Ascendant", label: "Ascendant" },
    ];

    const [expertsList] = useState({ experts: experts.experts });
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    const handlePageClick = (data: { selected: React.SetStateAction<number>; }) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentExperts = expertsList.experts.slice(offset, offset + itemsPerPage);

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Expertise page header */}
            <Container fluid className="mt-3 mx-auto" style={{ width: '80%' }}>
                <Row className="d-flex justify-content-between align-items-center">
                    <Col>
                        <h3 className="fw-bold">Browse taxonomic experts</h3>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button type="button" className="btn btn-primary">Register your expertise</button>
                    </Col>
                </Row>
            </Container>
            {/* Expertise page body */}
            <Container fluid className="flex-grow-1 mt-3 mx-auto" style={{ width: '80%' }}>
                <Row className="d-flex align-items-center w-100 mb-3">
                    <Form className="w-100 d-flex">
                        <Col md={2} className='me-2'>
                            <Form.Group controlId="search">
                                <Form.Control type="text" placeholder="Search" />
                            </Form.Group>
                        </Col>
                        {filterDropDown(fieldsOfContries)}
                        {filterDropDownSub(fieldsOfTaxonomy, fieldsOfSubTaxonomy)}
                        {/* {filterDropDown(fieldsOfSubTaxonomy)} */}
                        {filterDropDown(fieldsOfLanguages)}
                        {filterDropDown(fieldsOfResarch)}
                        <Col md={1} className="me-2">
                            <Button variant="primary" type="submit">
                                Filter
                            </Button>
                        </Col>
                        <Col md={1} className="me-2">
                            <Button variant="secondary" type="reset">
                                Reset
                            </Button>
                        </Col>
                    </Form>
                </Row>
                <Row className="mb-3 d-flex justify-content-between align-items-center">
                    <Col>
                        <h5 className="">Results {expertsList.experts.length}</h5>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Form.Group controlId="order">
                            <Form.Select>
                                {fieldsOfOrder.map((field, index) => {
                                    return <option key={index} value={field.value}>{field.label}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="overflow-auto">
                <Row className="justify-content-center">
                    {currentExperts.map((expert, index) => {
                        return (
                            <Col md={3} key={index} className="border border-2 m-3">
                                {renderExpertCard(index, expert)}
                            </Col>
                        );
                    })}
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(expertsList.experts.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination justify-content-center'}
                        activeClassName={'active'}
                    />
                </Row>
            </Container>
            {/* Render Footer */}
            <Footer />
            {/* Modal for registering expertise */}
        </div>
    );
}

export default Expertise2;

function renderExpertCard(index: number, expert: { id: number; name: string; description: string; status: string; scope: string; country: string; }) {
    const navigate = useNavigate();

    return <Col
        key={index} 
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/expertise2/${expert.name}`)}
        className="p-3">
        <Row>
            <Col>
                <h3 className="fs-3 fw-bold">{expert.name}</h3>
            </Col>
            <Col className="d-flex justify-content-end">
                <h4>{expert.language}</h4>
            </Col>
        </Row>
        <Row>
            <Col>
                <strong>{expert.scope}</strong>
            </Col>
        </Row>
        <Row>
            <Col className="d-flex flex-column justify-content-between">
                <p>{expert.description}</p>
                <p>{expert.country}</p>
            </Col>
            <Col className="d-flex justify-content-end">
                <img src={AvatarLogo} alt="Avatar" className="img-fluid rounded-circle" style={{ width: '50px', height: '50px' }} />
            </Col>
        </Row>

    </Col>;
}

function filterDropDown(fields: { value: string; label: string; }[]) {
    return <Col md={2} className="me-2">
        <Form.Group controlId="country">
            <Form.Select>
                {fields.map((field, index) => {
                    return <option key={index} value={field.value}>{field.label}</option>;
                })}
            </Form.Select>
        </Form.Group>
    </Col>;
}

function filterDropDownSub(fields: { value: string; label: string; }[], subfields: { value: string; label: string; }[]) {
    // const [open, setOpen] = useState(false);
    subfields;
    return <Col md={2} className="me-2">
        <Form.Group controlId="taxonomy">
            <Form.Select>
                {fields.map((field, index) => {
                    return <option key={index} value={field.value}>{field.label}</option>;
                })}
            </Form.Select>
        </Form.Group>
        {/* <OverlayTrigger
            key="top"
            placement="top"
            overlay={
                <Tooltip id="tooltip-top">
                    Sub-taxonomy
                </Tooltip>
            }
        >
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                <FontAwesomeIcon icon={faInfoCircle} />
            </Button>
        </OverlayTrigger>
        <Collapse in={open}>
            <div id="example-collapse-text">
                <Form.Group controlId="sub-taxonomy">
                    <Form.Select>
                        {subfields.map((field, index) => {
                            return <option key={index} value={field.value}>{field.label}</option>;
                        })}
                    </Form.Select>
                </Form.Group>
            </div>
        </Collapse> */}
    </Col>;
}
