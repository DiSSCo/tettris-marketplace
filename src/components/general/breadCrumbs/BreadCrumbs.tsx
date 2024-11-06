/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { useLocation, useSearchParams, Link } from "react-router-dom";

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getTaxonomicService } from 'redux-store/TaxonomicServiceSlice';

/* Import Icons */
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


/* Bread crumb type */
type BreadCrumb = {
    crumb: string,
    path?: string
}


/**
 * Component that renders bread crumbs based upon the current location
 * @returns JSX Component
 */
const BreadCrumbs = () => {
    /* Hooks */
    const location = useLocation();
    const [searchParams] = useSearchParams();

    /* Base variables */
    const taxonomicService = useAppSelector(getTaxonomicService);
    const breadCrumbs: BreadCrumb[] = [];

    /* Construct bread crumbs based on location */
    location.pathname.slice(1).split('/').forEach((pathPart) => {
        switch (pathPart) {
            case 'search': {
                breadCrumbs.push({
                    crumb: 'Taxonomic Services',
                    path: '/search'
                });

                if (location.pathname.includes('compare')) {
                    breadCrumbs.push({
                        crumb: 'Compare'
                    });
                };

                break;
            } case 'ts': {
                breadCrumbs.push({
                    crumb: 'Taxonomic Services',
                    path: '/search'
                });

                if (location.pathname.includes('suggestNewTaxonomicService')) {
                    breadCrumbs.push({
                        crumb: 'Suggest new taxonomic service'
                    });
                } else {
                    breadCrumbs.push({
                        crumb: `${taxonomicService?.taxonomicService['schema:Service']['schema:name']}`
                    });
                }

                break;
            }
        };
    });

    return (
        <div>
            <Row>
                {breadCrumbs.map((breadCrumb, index) => (
                    <Col key={breadCrumb.crumb}
                        xs="auto"
                        lg="auto"
                        className={`${index > 0 ? 'ps-0' : ''} pe-0`}
                    >
                        {/* Add arrow in between crumbs if index is greater than zero */}
                        {(index > 0) &&
                            <FontAwesomeIcon icon={faChevronRight}
                                className={`${searchParams.get('serviceType') === 'referenceCollection' ? 'tc-secondary' : 'tc-primary'} fs-4 fw-lightBold pe-2`}
                            />
                        }

                        {/* Bread crumb */}
                        {breadCrumb.path ?
                            <Link to={breadCrumb.path}>
                                <span className={`${searchParams.get('serviceType') === 'referenceCollection' ? 'tc-secondary' : 'tc-primary'} fs-4 fw-lightBold pe-2`}>{breadCrumb.crumb}</span>
                            </Link>
                            : <span className={`${searchParams.get('serviceType') === 'referenceCollection' ? 'tc-secondary' : 'tc-primary'} fs-4 fw-lightBold pe-2`}>{breadCrumb.crumb}</span>
                        }
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BreadCrumbs;