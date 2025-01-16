/* Import Dependencies */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/* Import Hooks */
import { usePaginator, useAppDispatch } from 'app/Hooks';

/* Import Store */
import { setIsApiOnline } from 'redux-store/AppStore';
import { setTaxonomicServices, concatToTaxonomicServices } from 'redux-store/TaxonomicServiceSlice';

/* Import Types */
import { TaxonomicService } from 'app/Types';

/* Import API */
import GetTaxonomicServices from 'api/taxonomicService/GetTaxonomicServices';

/* Import Components */
import Header from 'components/general/header/Header';
import TopBar from './components/TopBar';
import FiltersBar from './components/FiltersBar';
import SearchResults from './components/SearchResults';
import Footer from 'components/general/footer/Footer';
import { Button, Spinner } from 'components/general/CustomComponents';


/**
 * Base component that returns the Search page
 * @returns JSX.Component
 */
const Expertise = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [noMoreResults, setNoMoreResults] = useState<boolean>(false);

    /* Base variables */
    const paginator = usePaginator({
        Initiate: () => {
            dispatch(setTaxonomicServices([]));
            setNoMoreResults(false);
        },
        Method: GetTaxonomicServices,
        Handler: (taxonomicServices: TaxonomicService[]) => {
            /* On receival of a new page with records and add them to the total */
            dispatch(concatToTaxonomicServices(taxonomicServices));
            dispatch(setIsApiOnline(true))

            if (!taxonomicServices.length) {
                setNoMoreResults(true);
            }
        },
        ErrorHandler: () => {
            dispatch(setIsApiOnline(false));
        },
        pageSize: 12,
        resultKey: 'taxonomicServices',
        allowSearchParams: true
    });

    /* On search: check if there are any more records to be shown with the show more button */
    useEffect(() => {
        if (!noMoreResults) {
            const searchFilters = [...searchParams.entries()].reduce((filtersObject, [key, value]) => {
                return {
                    ...filtersObject,
                    [key]: value
                }
            }, {});

            GetTaxonomicServices({
                pageNumber: paginator.currentPage + 1,
                pageSize: 12,
                searchFilters
            }).then(({ taxonomicServices }) => {
                if (!taxonomicServices.length) {
                    setNoMoreResults(true);
                }
            });
        }
    }, [paginator]);

    /* ClassNames */
    const mainBodyClass = classNames({
        'gradient-tertiary': true,
    });

    const searchResultsClassScrollBlock = classNames({
        'overflow-x-hidden': paginator.totalRecords,
        'overflow-hidden': !paginator.totalRecords
    });

    const searchResultsClass = classNames({
        'h-100': !paginator.totalRecords && !paginator.errorMessage
    });

    const loadMoreBlockClass = classNames({
        'flex-grow-1': !paginator.loading && paginator.errorMessage,
        'mb-4': !paginator.errorMessage
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render Header */}
            <Header />

            {/* Home page Body */}
            <Container fluid className={`${mainBodyClass} flex-grow-1 overflow-hidden tr-smooth`}>
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column pt-5 px-4 px-lg-3"
                    >
                        {/* Top Bar */}
                        <Row>
                            <Col>
                                <TopBar />
                            </Col>
                        </Row>
                        {/* Filters Bar */}
                        <Row className="mt-1 d-none d-lg-flex">
                            <Col>
                                <FiltersBar />
                            </Col>
                        </Row>
                        {/* Results Count */}
                        <Row className="mt-4">
                            <Col>
                                <p className="fs-4 fw-lightBold">{`${paginator.totalRecords ?? 0} results`}</p>
                            </Col>
                        </Row>
                        {/* Search Results body */}
                        <Row className={`${searchResultsClassScrollBlock} flex-grow-1 mt-4 mb-4`}>
                            <Col className="h-100 d-flex flex-column">
                                {/* Search Result blocks */}
                                <Row className={searchResultsClass}>
                                    <Col>
                                        {paginator.totalRecords === 0 ?
                                            <Row className="h-100 align-items-center">
                                                <Col>
                                                    <p className="text-center">No records found</p>
                                                </Col>
                                            </Row>
                                            : <SearchResults />
                                        }
                                    </Col>
                                </Row>
                                {/* Load more button */}
                                <Row className={loadMoreBlockClass}>
                                    <Col className="d-flex justify-content-center">
                                        {(!paginator.loading && !noMoreResults && paginator.totalRecords > 0) &&
                                            <Button type="button"
                                                variant="tertiary"
                                                OnClick={() => paginator.Next?.()}
                                            >
                                                Load more
                                            </Button>
                                        }
                                        {(!paginator.loading && noMoreResults && paginator.totalRecords > 0) &&
                                            <Row className="h-100 align-items-center">
                                                <Col>
                                                    <p>{`No ${paginator.totalRecords > 0 ? 'more ' : ''}results found`}</p>
                                                </Col>
                                            </Row>
                                        }
                                        {paginator.loading &&
                                            <Spinner />
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            <Footer />
        </div >
    );
};

export default Expertise;