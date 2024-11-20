import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import AvatarLogo from 'webroot/img/avatar.png';
import MapImage from 'webroot/img/map.png'
import { FaBook, FaCalendarAlt, FaDog, FaEnvelope, FaGithub, FaGlobe, FaGraduationCap, FaLinkedin, FaUserTie } from 'react-icons/fa';

//import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { IconType } from 'react-icons';
import { words } from 'lodash';

//const geoUrl =  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const longText = "In today’s fast-paced world, technology continues to shape our daily lives in profound ways. From the way we communicate to how we work, digital innovations have made life more connected, efficient, and accessible. One of the most influential changes has been the rise of the internet, which has created a vast network of information that anyone with access can tap into. The internet has transformed industries, from healthcare and education to business and entertainment, offering new opportunities and challenges for individuals and organizations alike. Moreover, the rapid advancement of artificial intelligence (AI) and machine learning (ML) has begun to revolutionize various sectors. AI applications are now used to automate tasks, enhance decision-making, and even create new solutions to complex problems. As these technologies evolve, they have the potential to improve everything from product development to customer service, making businesses more agile and competitive. However, with these advancements also come new ethical concerns and questions about data privacy, security, and the future of work. As we continue to navigate the digital age, it is essential that we strike a balance between innovation and responsibility, ensuring that technology serves to benefit society as a whole while addressing the challenges it may bring."


const ExpertProfile3: React.FC = () => {
    const { name } = useParams<{ name: string | undefined }>();
    return (
        <div className="h-100 d-flex flex-column">
            <Header />
            {profileHeader(name)}
            {ExpertiseBody()}
            <Footer />
        </div>
    );
};

export default ExpertProfile3;


function ExpertiseBody() {
    return (
        <Container fluid className="flex-grow-1 overflow-auto mx-auto" style={{ width: '80%' }}>
            <Row>
                <Container fluid className='mb-3'>
                    <Col>
                        <h5>Expert Bio:</h5>
                    </Col>
                    <Col style={{ maxHeight: '50px', overflowY: 'auto' }}>
                        {longText}
                    </Col>
                </Container>    
            </Row>
            <Row className='mt-3'>
                <Col>
                    {TaxonomyBlock()}
                </Col>
                <Col>
                    {ExperienceBlock()}
                </Col>
                <Col>
                    {TrainingBlock()}
                </Col>
            </Row>
        </Container>    
    );
}

function TaxonomyBlock() {
    const [showMap, setShowMap] = useState(false);
    return (
        <Container fluid className='mb-3'>
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <h4 className="fw-lightBold">Taxonomy & Research scope</h4>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Col className='p-1'>
                    <h5 className='m-3'>Taxonomic discipline: xxxx</h5>
                    <h5 className='m-3'>Taxonomic sub-discipline: xxxx</h5>
                    <h5 className='m-3'>Taxonomic Orders: xxxx</h5>
                    <h5 className='m-3'>Taxonomic Order common names: xxxx</h5>
                    <h5 className='m-3'>Taxonomic Order common names: xxxx</h5>
                    <h5 className='m-3'>Taxonomic methodologies: xxxx</h5>
                    <h5 className='m-3'>Applied research: xxxx</h5>
                    <h5 className='m-3'>Geographic region: xxxx</h5>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={() => setShowMap(true)}>
                            Show Map
                        </Button>
                    </div>
                    <Modal show={showMap} onHide={() => setShowMap(false)} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Map</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={MapImage} alt="Map" style={{ width: '100%', height: 'auto' }} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowMap(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

function TrainingBlock() {
    return (
        <Container fluid className='mb-3'>
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <h4 className="fw-lightBold">Training provision</h4>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Col className='p-1'>
                    <Row>
                        <h5 className='m-4'>Training courses: xxxx</h5>
                    </Row>
                    <Row>
                        <h5 className='m-4'>Training courses:</h5>
                        <Col className='m-3' style={{ maxHeight: '300px', overflowY: 'auto' }}>       
                            {coursesBlock()}
                            {coursesBlock()}
                            {coursesBlock()}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

function coursesBlock() {
    return (
        <Container fluid className='p-3' style={{ backgroundColor: 'lightgrey' }}>
            <Row>
                <Col>
                    <h5>Course Title: Advanced Biology</h5>
                    <p>Description: This course covers advanced topics in biology, including genetics, molecular biology, and ecology.</p>
                    <a href="https://example.com/course" target="_blank" rel="noopener noreferrer">Course Link</a>
                </Col>
            </Row>
        </Container>
    );
}

function ExperienceBlock() {
    return (
        <Container fluid className='mb-3'>
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <h4 className="fw-lightBold">Experience & Qualification</h4>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Col className='p-1'>
                    <h5 className='m-4'>Education level: xxxx</h5>
                    <h5 className='m-4'>Employment status: xxxx</h5>
                    <h5 className='m-4'>Professionnal experience: xxxx</h5>
                    <h5 className='m-4'>Taxonomic publication: xxxx</h5>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Col>
            </Row>
        </Container>
    );
}

function profileHeader(name: string | undefined) {
    return <Container fluid className="flex-grow-1 mx-auto mb-3" style={{ width: '80%' }}>
        <Row className='mt-3 d-flex align-items-center justify-content-between'>
            <Col xs="auto">
                <img src={AvatarLogo} alt="Avatar" style={{ width: '100px', height: '100px' }} />
            </Col>
            <Col>
                <Row>
                    <Col>
                        <h3 className="fw-bold">{name}</h3>
                        <h5>Headline: Biology</h5>
                    </Col>
                    <Col>
                        <h5>ORCID ID: xxxxxxxxx</h5>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex justify-content-around">
                            <FaGithub className='m-1' size={30} />
                            <FaLinkedin className='m-1' size={30} />
                            <FaGlobe className='m-1' size={30} />
                            <FaUserTie className='m-1' size={30} />
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <h5>Country: xxxxxxxxx</h5>
                        <h5>Organisation: xxxxxxxxx</h5>
                    </Col>
                    <Col>
                        <h5>Language: xxxxxxxxx</h5>
                        <h5>Organisation website</h5>
                    </Col>
                    <Col>
                        <h5>ROR ID: xxxxxxxxx</h5>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button className="btn btn-primary">
                            <FaEnvelope /> Email
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>;
}
