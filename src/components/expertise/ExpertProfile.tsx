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
            <Container fluid className="flex-grow-1 p-3  overflow-auto">                
                <Row className="flex-column flex-md-row">
                    <Col md={4} className="d-flex flex-column align-items-center" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                        <img src={AvatarLogo}
                            alt="AvatarLogo"
                            className="avatar-logo img-fluid mb-3"
                        />
                        <h1 className="text-left w-100">About <strong>{name || "Expert"}</strong></h1>
                        <h2 className="text-left w-100">Data analyst with a focus on biodiversity</h2>
                        
                        <p className="text-left w-100"><strong>ORCID:</strong> 0000-0001-2345-6789</p>
                        <p className="text-left w-100"><strong>Email:</strong> expert@example.com</p>
                        <p className="text-left w-100"><strong>Gender:</strong> Female</p>
                        <p className="text-left w-100"><strong>Nationality:</strong> American</p>
                        <p className="text-left w-100"><strong>Age:</strong> 35</p>
                    </Col>
                    <Col>
                        <h1>Expertise</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                            tincidunt, nunc nec tincidunt luctus, pur
                            us odio ultricies nunc, nec blandit nunc nisl vel nunc. Nulla
                            facilisi. Nullam nec nisi at purus
                            ultrices ultricies. Nulla facilisi. Nullam nec nisi at purus 
                        </p>

                        <Row className="mt-4">
                            <Col xs={4} md={2} className="text-center">
                                <i className="fas fa-chart-line fa-3x"></i>
                                <p>Data Analysis</p>
                            </Col>
                            <Col xs={4} md={2} className="text-center">
                                <i className="fas fa-leaf fa-3x"></i>
                                <p>Biodiversity</p>
                            </Col>
                            <Col xs={4} md={2} className="text-center">
                                <i className="fas fa-database fa-3x"></i>
                                <p>Database Management</p>
                            </Col>
                            <Col xs={4} md={2} className="text-center">
                                <i className="fas fa-code fa-3x"></i>
                                <p>Programming</p>
                            </Col>
                            <Col xs={4} md={2} className="text-center">
                                <i className="fas fa-project-diagram fa-3x"></i>
                                <p>Project Management</p>
                            </Col>
                            <Col xs={4} md={2} className="text-center">
                                <i className="fas fa-users fa-3x"></i>
                                <p>Team Collaboration</p>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col xs={6} md={3} className="text-center">
                                <a href="https://www.linkedin.com/in/expert" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin fa-3x"></i>
                                    <p>LinkedIn</p>
                                </a>
                            </Col>
                            <Col xs={6} md={3} className="text-center">
                                <a href="https://github.com/expert" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github fa-3x"></i>
                                    <p>GitHub</p>
                                </a>
                            </Col>
                            <Col xs={6} md={3} className="text-center">
                                <a href="https://orcid.org/0000-0001-2345-6789" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-orcid fa-3x"></i>
                                    <p>ORCID</p>
                                </a>
                            </Col>
                            <Col xs={6} md={3} className="text-center">
                                <a href="https://www.expertwebsite.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-globe fa-3x"></i>
                                    <p>Personal Page</p>
                                </a>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <h2>Location</h2>
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
                    </Col>
                </Row>
                <Row></Row>
            </Container>
            <Footer />
        </div>
    );
};

export default ExpertProfile;