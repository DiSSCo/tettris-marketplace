/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './home.module.scss';

/* Import Components */
import Header from "components/general/header/Header";
import SearchBar from './components/SearchBar';
import HomeCategory from './components/HomeCategory';
import Footer from 'components/general/footer/Footer';


/**
 * Base component that renders the Home page
 * @returns JSX Component
 */
const Home = () => {
    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className="flex-grow-1">
                <Row className="h-100">
                    <Col className="h-100 d-flex flex-column">
                        {/* Big background image with Title and primary Search Bar */}
                        <Row className={`${styles.background} flex-grow-1`}>
                            <Col lg={{ span: 10, offset: 1 }}
                                className="h-100 d-flex flex-column justify-content-center"
                            >
                                {/* Title */}
                                <Row>
                                    <Col>
                                        <h1 className="fs-title tc-white fw-bold">A hive for finding and supplying <br /> taxonomic expertise and services</h1>
                                        <div className="bgc-white w-25 pt-1 mt-3" />
                                    </Col>
                                </Row>

                                {/* Search Bar */}
                                <Row className="mt-5">
                                    <Col lg={{span: 5}}>
                                        <SearchBar />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {/* Search Category representation */}
                        <Row>
                            <Col lg={{ span: 1 }} className="p-0">
                                <div className={`${styles.homeCategoryBar} bgc-grey py-3`} />
                            </Col>
                            <Col lg={{ span: 10 }}>
                                <Row>
                                    <Col lg={{ span: 4 }}>
                                        <HomeCategory title="Taxonomic Services"
                                            subTitle="Go find"
                                            count={254}
                                            link="/search"
                                            color="primary"
                                        />
                                    </Col>
                                    <Col lg={{ span: 4 }}>
                                        <HomeCategory title="Reference Collections"
                                            subTitle="Go explore"
                                            count={84}
                                            link="/search?taxonomicServiceType=referenceCollection"
                                            color="secondary"
                                        />
                                    </Col>
                                    <Col lg={{ span: 4 }}>
                                        <HomeCategory title="Expertise Taxonomists"
                                            subTitle="Go engage"
                                            count={113}
                                            link="/expertise"
                                            color="tertiary"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={{ span: 1 }} className="p-0">
                                <div className={`${styles.homeCategoryBar} bgc-grey py-3`} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            <Footer />
        </div>
    );
}

export default Home;