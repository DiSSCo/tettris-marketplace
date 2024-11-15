import React from 'react';
/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import AvatarLogo from 'webroot/img/avatar.png';
import { FaBook, FaCalendarAlt, FaDog, FaGithub, FaGlobe, FaGraduationCap, FaLinkedin, FaUserTie } from 'react-icons/fa';

//import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { IconType } from 'react-icons';

//const geoUrl =  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"


const ExpertProfile: React.FC = () => {
    const { name } = useParams<{ name: string | undefined }>();
    return (
        <div className="h-100 d-flex flex-column">
            <Header />
            <Container fluid className="flex-grow-1 p-3 overflow-auto" style={{ marginLeft: '10%', marginRight: '10%' }} >                
                <Row className="h-100">
                    <Col md={2} className="d-flex flex-column align-items-center mt-4" style={{ borderRight: '1px solid var(--tertiary)'}}>
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
                            <h2 className="text-center w-100"><strong>{name || "Expert"}</strong></h2>
                        </Row>
                        <Row>
                            <h4 className="text-left w-100">Headline expertise</h4>
                        </Row>
                        {/* <Row>
                            <span className="text-center w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                        </Row> */}
                        <Row className="mt-4 p-3" style={{ marginLeft: '10px', marginRight: '10px', backgroundColor: 'lightgrey', borderRadius: '10px' }}>
                            <p className="text-left w-100"><strong>ORCID:</strong> 0000-0001-2345-6789</p>
                            <p className="text-left w-100"><strong>Email:</strong> expert@example.com</p>
                            {/* <p className="text-left w-100"><strong>Nationality:</strong> American</p> */}
                            <p className="text-left w-100"><strong>Language:</strong> English</p>
                            <p className="text-left w-100"><strong>Institution:</strong> CETAF</p>
                            <p className="text-left w-100"><strong>Address:</strong> Brussels</p>
                            <p className="text-left w-100"><strong>RoR ID:</strong> ID</p>
                        </Row>
                        <Row className="m-4">
                            <Row className='mb-2'>
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
                            </Row>
                            <Row className='mb-2'>
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
                                    <span>Personal page</span>
                                </a>
                            </Row>
                            <Row className='mb-2'>
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
                            </Row>
                        </Row>
                    </Col>
                    <Col md={8}>
                        <Row className='mb-3'>
                            <Col md={8}>
                                <ScopeBlock />
                                <ProfessionalBlock />
                                {/* <ExpertiseBlock /> */}
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
                        {/* <h2 className="text-left w-100"><strong>Headline expertise</strong></h2> */}
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </Col>
                </Row>
                
            </Row>
        </Container>
    );
}

const ProfessionalBlock = () => {

    return (
        <Container className="mt-4">
            <Row className='mx-4'>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <p className="fw-lightBold">Professional Experience</p>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Row>
                    <Col>
                        <h3 className="text-left w-100"><strong>Expertise Biography</strong></h3>
                        <div className='mb-3 mt-3' style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
        <p className="text-left w-100">
            The world of technology evolves at a pace that often feels impossible to keep up with. Every year, 
            groundbreaking innovations reshape how we live, work, and connect with one another. Artificial intelligence, 
            for instance, has transitioned from a distant concept to a practical tool powering everything from virtual 
            assistants to predictive analytics in healthcare. Similarly, renewable energy technologies are advancing 
            rapidly, offering cleaner alternatives to fossil fuels and promising a more sustainable future.
            <br /><br />
            However, with progress comes challenges. The rapid digital transformation has raised concerns about privacy, 
            cybersecurity, and the ethical implications of new technologies. Questions about data ownership and the 
            societal impact of automation have become central to global discussions. How do we ensure these advancements 
            benefit everyone and not just a select few?
            <br /><br />
            As we navigate this era of innovation, adaptability and education are crucial. Staying informed and embracing 
            lifelong learning will empower individuals to thrive in a world driven by constant change. While challenges are 
            inevitable, the potential of technology to solve pressing global issues and improve lives is boundless.
            <br /><br />
            In this dynamic environment, the intersection of human creativity and technological progress holds the key to 
            shaping a future that is equitable, inclusive, and sustainable for all.
        </p>
    </div> </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="text-left w-100"><strong>Qualifications</strong></h3>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="text-left w-100"><strong>Employment Status</strong></h3>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="text-left w-100"><strong>Professional Experience</strong></h3>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="text-left w-100"><strong>Taxonomic Publications</strong></h3>
                        <p className="text-left w-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                        <p className="fw-lightBold">Methods & Applied Research Field</p>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mx-1" style={{ border: '1px solid var(--tertiary)', padding: '10px' }}>
                <Row>
                    <Col>
                        <h3 className="text-left w-100">Taxonomic methodologies</h3>
                        <p className="text-left w-100">Morphological</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="text-left w-100">Fields of Applied Research</h3>
                        <p className="text-left w-100">Fresh marine ecosystem</p>
                    </Col>
                </Row>
                {/* <RowExperiences title="Qualifications" content="Graduate" IconElement={FaGraduationCap} />
                <RowExperiences title="Employment Status" content="Part-time Scientist" IconElement={FaUserTie} />
                <RowExperiences title="Professional Experience" content="21 - 25 years" IconElement={FaCalendarAlt} />
                <RowExperiences title="Taxonomic Publications" content="3 publications" IconElement={FaBook} />  */}
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
                <Row className='mt-3'>
                    <Col>
                        {/* <Row>
                            <h2 className="text-left w-100 mb-3"><strong>Training</strong></h2>
                        </Row> */}
                        <Row>
                            <TrainingRow title="Training 1" link="https://www.example.com" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                            <TrainingRow title="Training 2" link="https://www.example.com" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                            {/* <TrainingRow title="Training 3" link="https://www.example.com" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." /> */}
                        </Row>
                    </Col>
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
        <Row className='mb-3'>
            <h4 className="text-left w-100 mb-3">{title}</h4>
            <span className="text-left w-100 mb-2">{description}</span>
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
                {disciplineRow("Taxonomic Discipline 1", ["Taxonomic  sub-discipline 1", "Taxonomic  sub-discipline 2", "Taxonomic  sub-discipline 3"])}
                {/* {disciplineRow("Taxonomic Discipline 2", ["Taxonomic  sub-discipline 1", "Taxonomic  sub-discipline 2", "Taxonomic  sub-discipline 3"])} */}
                <Row className="mt-4">
                    <Col>
                        <h4 className="text-left w-100 mb-3"><strong>Taxonomic Order</strong></h4>
                        {/* <h5 className="text-center w-100">Taxonomic Sub-order 1</h5>
                        <h5 className="text-center w-100">Taxonomic Sub-order 2</h5>
                        <h5 className="text-center w-100">Taxonomic Sub-order 3</h5> */}
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <h4 className="text-left w-100 mb-3"><strong>Taxonomic order common names</strong></h4>
                        <h5 className="text-center w-100">Hymenoptera</h5>
                        <h5 className="text-center w-100">Ants</h5>
                        <h5 className="text-center w-100">Dragonflies</h5>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}

const disciplineRow = (title: string, subdisciplines: string[]) => {
    return (
        <Row className='mb-3'>
            <Col>
                <h4 className="text-left w-100 mb-3"><strong>{title}</strong></h4>
                {subdisciplines.map((subdiscipline, index) => (
                    <Col className="d-flex justify-content-between">
                        <h5 key={index} className="text-center w-100">{subdiscipline}</h5>
                        <FaDog size={20} style={{ color: '#007bff' }} />
                    </Col>
                ))}
            </Col>
        </Row>
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
                        <h2 className="text-left w-100"><strong>Geographic region</strong></h2>
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