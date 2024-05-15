/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useFocus } from 'app/Hooks';

/* Import Icons */
import { faFilter } from '@fortawesome/free-solid-svg-icons';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Components */
import FiltersBar from './FiltersBar';
import { Button } from 'components/general/CustomComponents';


/** Component that renders the Top Bar of the Search page,
 * containing a title and the option to suggest new taxonomic services
*/
const TopBar = () => {
    /* Hooks */
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    /* Base variables */
    const [filtersToggle, setFiltersToggle] = useState<boolean>(false);

    /* Create ref and focus for mobile filters */
    const filtersRef = useRef<HTMLDivElement>(null);
    const filtersFocus = useFocus({ ref: filtersRef, OnFocusLose: () => setFiltersToggle(false) });

    /* Class Names */
    const filtersClass = classNames({
        [`${styles.topBarFilters}`]: true,
        'd-none': !filtersToggle,
        'd-block': filtersToggle
    });

    return (
        <div className="position-relative">
            <Row>
                <Col xs={{ span: 12 }} lg>
                    <h1 className="fs-2 fs-lg-2 fw-lightBold">
                        Browse the catalog
                    </h1>
                </Col>
                {/* Display filters menu, if device is mobile */}
                <Col xs
                    className="d-block d-lg-none mt-3"
                >
                    <Button type="button"
                        variant={searchParams.get('taxonomicServiceType') === 'referenceCollection' ? 'secondary' : 'primary'}
                        className="fs-5"
                        OnClick={() => setFiltersToggle(!filtersToggle)}
                    >
                        <>
                            <span className="pe-2">Filters</span>
                            <FontAwesomeIcon icon={faFilter} />
                        </>
                    </Button>

                    {/* Absolute position filters bar */}
                    <div ref={filtersRef}
                        className={`${filtersClass} position-absolute z-1 bgc-grey-light mt-3 px-3 py-3`}
                    >
                        <FiltersBar ToggleFilters={() => setFiltersToggle(!filtersToggle)} />
                    </div>
                </Col>
                <Col xs="auto" lg="auto"
                    className="mt-3 mt-lg-0"
                >
                    <Button type="button"
                        variant={searchParams.get('taxonomicServiceType') === 'referenceCollection' ? 'secondary' : 'primary'}
                        className="fs-5 fs-lg-4"
                        OnClick={() => navigate('/ts/add')}
                    >
                        Suggest a new service
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default TopBar;