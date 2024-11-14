import React from 'react';
/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import AvatarLogo from 'webroot/img/avatar.png';


const ExpertProfile: React.FC = () => {
    const { name } = useParams<{ name: string | undefined }>();
    return (
        <div className="h-100 d-flex flex-column">
            <Header />
            <Container fluid className="flex-grow-1 p-3 overflow-auto" style={{ marginLeft: '150px', marginRight: '150px' }}>                
                <Row className="h-100">
                    <Col md={2} className="d-flex flex-column align-items-center h-100" style={{ borderRight: '1px solid #ccc' }}>
                        <Row className="avatar-logo img-fluid mb-3 mt-5" style={{ 
                            width: '100px', 
                            height: '100px', 
                            borderRadius: '50%', 
                            backgroundColor: '#ccc', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            overflow: 'hidden' 
                        }}>
                            {AvatarLogo ? <img src={AvatarLogo} alt="AvatarLogo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : (name ? name.charAt(0) : 'E')}
                        </Row>
                        <Row>
                            <h1 className="text-center w-100"><strong>{name || "Expert"}</strong></h1>
                        </Row>
                        <Row className="mt-5">
                            <p className="text-left w-100"><strong>ORCID:</strong> 0000-0001-2345-6789</p>
                            <p className="text-left w-100"><strong>Email:</strong> expert@example.com</p>
                            <p className="text-left w-100"><strong>Nationality:</strong> American</p>
                            <p className="text-left w-100"><strong>Language:</strong> en</p>
                        </Row>
                       
                    </Col>
                    <Col md={8}>
                        <Row className='mb-3'>
                            <Col md={8}>
                                <ExpertiseBlock />
                                <ScopeBlock />
                                <MapBlock />
                            </Col>
                            <Col>
                                <ExperienceBlock />
                                <TrainingBlock />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};


const ExpertiseBlock = () => {

    return (
        <Container className="mt-4">
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <p className="fw-lightBold">Description expertise</p>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Row>
                    <Col>
                        <h1 className="text-left w-100"><strong>Headline expertise</strong></h1>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary p-1">
                            Visit Example
                        </a>
                    </Col>
                    <Col>
                        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary p-1">
                            Visit Example
                        </a>
                    </Col>
                    <Col>
                        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary p-1">
                            Visit Example
                        </a>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}

const ExperienceBlock = () => {

    return (
        <Container className="mt-4">
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <p className="fw-lightBold">Experiences</p>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Row>
                    <Col>
                        <h1 className="text-left w-100"><strong>Job title</strong></h1>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </Col>
                </Row>
                <Row className="mt-4">
                </Row>
            </Row>
        </Container>
    );
}

const TrainingBlock = () => {

    return (
        <Container className="mt-4">
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <p className="fw-lightBold">Training</p>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Row>
                    <Col>
                        <h1 className="text-left w-100"><strong>Training</strong></h1>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </Col>
                </Row>
                <Row className="mt-4">
                </Row>
            </Row>
        </Container>
    );
}

const ScopeBlock = () => {

    return (
        <Container className="mt-4">
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <p className="fw-lightBold">Taxonomic Scope</p>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Row>
                    <Col>
                        <h1 className="text-left w-100"><strong>Taxonomic Discipline</strong></h1>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </Col>
                </Row>
                <Row className="mt-4">
                </Row>
            </Row>
        </Container>
    );
}

const MapBlock = () => {

    return (
        <Container className="mt-4">
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <p className="fw-lightBold">Taxonomic Map</p>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Row>
                    <Col>
                        <h1 className="text-left w-100"><strong>Taxonomic Map</strong></h1>
                        <div style={{ height: '400px', width: '100%' }}>
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=2.513573032246143%2C49.529483547557504%2C6.15665815595878%2C51.47502370869813&layer=mapnik`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}


export default ExpertProfile;