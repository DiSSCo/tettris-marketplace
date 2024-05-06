/* Import Dependencies */
import { useEffect, useState } from 'react';
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
 * Paginator Hook for handling pagination with fetch requests and page numbers
 * @returns Instance of hook
 */
const usePaginator = ({ Method, Handler, key, currentRecords }: { Method: Function, Handler: Function, key?: string, currentRecords?: Dict[] }) => {
    /* Base variables */
    const [records, setRecords] = useState<Dict[]>(currentRecords ?? []);
    const [links, setLinks] = useState<Dict>({});
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pageSize: number = 12;
    const [loading, setLoading] = useState<boolean>(false);

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

    useEffect(() => {
        /* Set Loading to true */
        setLoading(true);

        setTimeout(() => {
            /* Fetch data */
            (async () => {
                const result = await Method({ pageNumber, pageSize });

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
    usePaginator
}