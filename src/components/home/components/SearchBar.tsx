/* Import Dependencies */
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Components */
import { QueryBar } from 'components/general/FormComponents';


/** Component that renders a Search Bar for entering a search query for taxonomic services, will redirect to search page */
const SearchBar = () => {
    /* Hooks */
    const navigate = useNavigate();

    return (
        <div className={`${styles.searchBar} position-absolute position-lg-static top-0 start-0 w-100 bgc-white br-corner`}>
            <Formik initialValues={{
                query: ''
            }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    /* Navigate to Search page and initate search with provided query */
                    if (values.query) {
                        navigate(`/search?query=${values.query}`);
                    }
                }}
            >
                <Form className="px-4 pt-2 pb-3">
                    <Row>
                        <Col>
                            <p className="fs-3 fw-lightBold">Search for taxonomic services</p>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="">
                            <QueryBar name="query"
                                placeholder="Enter search query"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </QueryBar>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
    );
}

export default SearchBar;