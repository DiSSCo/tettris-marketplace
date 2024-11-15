import React from 'react';
/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import AvatarLogo from 'webroot/img/avatar.png';
import { FaBook, FaCalendarAlt, FaGithub, FaGlobe, FaGraduationCap, FaLinkedin, FaUserTie } from 'react-icons/fa';

//import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { IconType } from 'react-icons';

//const geoUrl =  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"


const ExpertProfile: React.FC = () => {
    const { name } = useParams<{ name: string | undefined }>();
    return (
        <div className="h-100 d-flex flex-column">
            <Header />
            <Container fluid className="flex-grow-1 p-3 overflow-auto" style={{ marginLeft: '150px', marginRight: '150px' }}>                
                <Row className="h-100">
                    <Col md={2} className="d-flex flex-column align-items-center h-100 mt-4" style={{ border: '1px solid var(--tertiary)'}}>
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
                        <Row className='p-1'>
                            <h1 className="text-center w-100"><strong>{name || "Expert"}</strong></h1>
                        </Row>
                        <Row className="mt-5" style={{ marginLeft: '10px' }}>
                            <p className="text-left w-100"><strong>Email:</strong> expert@example.com</p>
                            <p className="text-left w-100"><strong>ORCID:</strong> 0000-0001-2345-6789</p>
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
                        <a 
                            href="https://www.github.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-primary d-flex align-items-center p-2"
                            style={{
                                textDecoration: 'none',
                                color: '#fff',
                                gap: '8px',
                            }}
                        >
                            <FaGithub size={20} style={{ color: '#fff' }} />
                            <span>Visit Github</span>
                        </a>
                    </Col>
                    <Col>
                        <a 
                            href="https://www.example.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-primary d-flex align-items-center p-2"
                            style={{
                                textDecoration: 'none',
                                color: '#fff',
                                gap: '8px',
                            }}
                        >
                            <FaGlobe size={20} style={{ color: '#fff' }} />
                            <span>Visit Website</span>
                        </a>
                    </Col>
                    <Col>
                    <a 
                            href="https://www.linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-primary d-flex align-items-center p-2"
                            style={{
                                textDecoration: 'none',
                                color: '#fff',
                                gap: '8px',
                            }}
                        >
                            <FaLinkedin size={20} style={{ color: '#fff' }} />
                            <span>Visit Linkedin</span>
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
                <RowExperiences title="Qualifications" content="Graduate" IconElement={FaGraduationCap} />
                <RowExperiences title="Employment Status" content="Part-time Scientist" IconElement={FaUserTie} />
                <RowExperiences title="Professional Experience" content="21 - 25 years" IconElement={FaCalendarAlt} />
                <RowExperiences title="Taxonomic Publications" content="3 publications" IconElement={FaBook} />
            </Row>
        </Container>
    );
}


interface RowExperiencesProps {
    title: string;
    content: string;
    IconElement: IconType;
}

const RowExperiences: React.FC<RowExperiencesProps> = ({ title, content, IconElement }) => {
    return (
        <Row className="mt-4 align-items-center">
            <Col md={2} className="d-flex justify-content-center">
                <IconElement size={40} style={{ color: '#007bff' }} />
            </Col>
            <Col md={10}>
                <h5 className="text-left font-weight-bold" style={{ color: '#333' }}>{title}</h5>
                <p className="text-left" style={{ color: '#555', fontSize: '16px' }}>{content}</p>
            </Col>
        </Row>
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
                        <Row>
                            <h1 className="text-left w-100"><strong>Training</strong></h1>
                        </Row>
                        <Row>
                            <TrainingRow title="Training 1" link="https://www.example.com" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                            <TrainingRow title="Training 2" link="https://www.example.com" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                            <TrainingRow title="Training 3" link="https://www.example.com" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-4">
                </Row>
            </Row>
        </Container>
    );
}


interface TrainingRowProps {
    title: string;
    link: string;
    description: string;
}

const TrainingRow: React.FC<TrainingRowProps> = ({ title, link, description }) => {
    return (
        <Row>
            <h5 className="text-left w-100">{title}</h5>
            <span className="text-left w-100">{description}</span>
            <a 
                href={link}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary d-flex align-items-center p-1 m-1"
                style={{
                    textDecoration: 'none',
                    color: '#fff',
                    gap: '8px',
                }}
            >
                <FaGlobe size={20} style={{ color: '#fff' }} />
                <span>More about {title}</span>
            </a>
        </Row>
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
                        <h3 className="text-left w-100"><strong>Taxonomic Discipline 1</strong></h3>
                        <h5 className="text-center w-100">Taxonomic  sub-discipline 1</h5>
                        <h5 className="text-center w-100">Taxonomic  sub-discipline 2</h5>
                        <h5 className="text-center w-100">Taxonomic  sub-discipline 3</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="text-left w-100"><strong>Taxonomic Discipline 2</strong></h3>
                        <h5 className="text-center w-100">Taxonomic  sub-discipline 1</h5>
                        <h5 className="text-center w-100">Taxonomic  sub-discipline 2</h5>
                        <h5 className="text-center w-100">Taxonomic  sub-discipline 3</h5>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <h3 className="text-left w-100"><strong>Taxonomic Order</strong></h3>
                        <h5 className="text-center w-100">Taxonomic Sub-order 1</h5>
                        <h5 className="text-center w-100">Taxonomic Sub-order 2</h5>
                        <h5 className="text-center w-100">Taxonomic Sub-order 3</h5>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <h3 className="text-left w-100"><strong>Taxonomic order common names</strong></h3>
                        <h5 className="text-center w-100">Bees</h5>
                        <h5 className="text-center w-100">Ants</h5>
                        <h5 className="text-center w-100">Dragonflies</h5>
                    </Col>
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
                        <h1 className="text-left w-100"><strong>Geographic region</strong></h1>
                        {/* <ComposableMap>
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography key={geo.rsmKey} geography={geo} />
                                ))
                                }
                            </Geographies>
                        </ComposableMap> */}
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