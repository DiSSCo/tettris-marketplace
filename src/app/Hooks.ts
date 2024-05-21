/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/* Import Types */
import type { RootState, AppDispatch } from './Store';
import { Dict } from './Types';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


/**
 * Fetch hook for handling fetch requests
 * @returns Instance of hook
 */
const useFetch = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const Fetch = ({ Method, Handler, params }: { Method: Function, Handler?: Function, params?: Dict }) => {
        const [fetchResult, setFetchResult] = useState<any>();

        useEffect(() => {
            Method(params).then((result: Dict) => {
                setFetchResult(result);

                Handler?.(result);
            }).finally(() => {
                setLoading(false);
            });
        }, []);

        return fetchResult
    };

    /**
     * Function to fetch multiple endpoints at the same time
     * @param methods Fetch methods to query
     * @returns Results
     */
    const FetchMultiple = async (...methods: Function[]) => {
        const promises: Promise<Dict>[] = [];
        let fetchResults: Dict[] | undefined;

        methods.forEach((Method) => {
            promises.push(Method());
        });

        await Promise.allSettled(promises).then((results) => {
            fetchResults = results;
        });

        return fetchResults;
    };

    return {
        loading,
        Fetch,
        FetchMultiple
    };
}


/**
 * Focus hook for handling the focus of a specific HTML element
 * @param ref A React reference to the focussed element
 * @returns Instance of hook
 */
const useFocus = ({ ref, OnFocusLose }: { ref: React.RefObject<HTMLElement>, OnFocusLose?: Function }) => {
    /* Base variables */
    const [focusToggle, setFocusToggle] = useState<boolean>(false);

    useEffect(() => {
        const focusElement = ref.current as HTMLDivElement;

        /**
         * Function to handle a click outside of the element
         * @param event The click event initiated by the user
         */
        const HandleClickOutside = (event: Dict) => {
            if (!focusElement.contains(event.target)) {
                setFocusToggle(false);

                /* Call OnFocusLose function if defined */
                OnFocusLose?.();
            }
        };

        /* Set listener for mouse down (click) events */
        document.addEventListener("mousedown", HandleClickOutside);

        /* Clean up function */
        return () => {
            document.removeEventListener("mousedown", HandleClickOutside);
        };
    }, [ref]);

    return {
        focusToggle
    };
}


/**
 * Paginator Hook for handling pagination with fetch requests and page numbers
 * @returns Instance of hook
 */
const usePaginator = ({ Initiate, Method, Handler, pageSize, key, allowSearchParams = false }:
    { Initiate: Function, Method: Function, Handler: Function, pageSize: number, key?: string, allowSearchParams: boolean }
) => {
    /* Hooks */
    const [searchParams] = useSearchParams();

    /* Base variables */
    const [records, setRecords] = useState<Dict[]>([]);
    const [links, setLinks] = useState<Dict>({});
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    /* Get search filters from search params */
    const searchFilters = [...searchParams.entries()].reduce((filtersObject, [key, value]) => {
        return {
            ...filtersObject,
            [key]: value
        }
    }, {});

    const Next = () => {
        if ('next' in links) {
            setPageNumber(pageNumber + 1);

            return true;
        } else {
            throw (new Error('No next page'));
        }
    };

    const Previous = () => {
        if ('prev' in links) {
            setPageNumber(pageNumber - 1);

            return true;
        } else {
            throw (new Error('No previous page'));
        }
    };

    /* Initial setup */
    useEffect(() => {
        Initiate();
    }, []);

    useEffect(() => {
        /* Set Loading to true */
        setLoading(true);

        setTimeout(() => {
            /* Fetch data */
            (async () => {
                const result = await Method({ pageNumber, pageSize, ...(allowSearchParams && { searchFilters }) });

                if (result) {
                    if (result?.links) {
                        setLinks(result.links);
                        delete (result.links);
                    }

                    const records = key ? result[key] : result[Object.keys(result)[0]];

                    setRecords(records);
                    Handler(records);
                } else {
                    throw (new Error('Fetch ended in undefined Result'));
                }

                setLoading(false);
            })();
        }, 3000);
    }, [pageNumber]);

    return {
        records,
        loading,
        SetLinks: (links: Dict) => setLinks(links),
        Next,
        Previous
    };
};

export {
    useFetch,
    useFocus,
    usePaginator
}