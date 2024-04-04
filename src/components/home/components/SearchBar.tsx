/* Import Dependencies */
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


/** Component that renders a Search Bar for entering a search query for taxonomic services, will redirect to search page */
const SearchBar = () => {
    /* Hooks */
    const navigate = useNavigate();

    return (
        <div className="bgc-white br-corner">
            <Formik initialValues={{
                query: ''
            }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    /* Navigate to Search page and initate search with provided query */
                    navigate(`/search?query=${values.query}`);
                }}
            >
                <Form className="px-4 pt-2 pb-3">
                    <Row>
                        <Col>
                            <p className="fs-3 fw-lightBold">Search for taxonomic services</p>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="position-relative d-flex flex-column justify-content-center">
                            <Field name="query"
                                className="w-100 py-1 px-2"
                                placeholder="Enter search query"
                            />
                            <button type="submit"
                                className="bgc-none b-none fs-4 position-absolute end-0 me-4"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
    );
}

export default SearchBar;