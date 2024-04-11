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
 * @returns 
 */
const useFetch = () => {
    const Fetch = async (Method: Function) => {
        let fetchResult: Dict | undefined;

        await Method().then((result: Dict) => {
            fetchResult = result;
        }).catch((error: string) => {
            console.warn(error);
        });

        return fetchResult;
    };

    /**
     * Function to fetch multiple endpoints at the same time
     * @param methods Fetch methods to query
     * @returns Results
     */
    const FetchMultiple = async (...methods: Function[]) => {
        const promises: Promise<Dict>[] = [];
        let fetchResults: Dict | undefined;

        methods.forEach((Method) => {
            promises.push(Method());
        });

        await Promise.allSettled(promises).then((results) => {
            fetchResults = results;
        });

        return fetchResults;
    };

    return {
        Fetch,
        FetchMultiple
    };
}


/**
 * Paginator Hook for handling pagination with fetch requests and page numbers
 * @returns Instance of hook
 */
const usePaginator = (Method: Function, Hanlder: Function, key?: string) => {
    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const [records, setRecords] = useState<Dict[]>([]);
    const [links, setLinks] = useState<Dict>({});
    const [pageNumber, setPageNumber] = useState<number>(1);
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
            fetch.Fetch(Method).then((result) => {
                if (result) {
                    if (result?.links) {
                        setLinks(result.links);
                        delete (result.links);
                    }

                    const records = key ? result[key] : result[Object.keys(result)[0]];

                    setRecords(records);
                    Hanlder(records);
                } else {
                    throw (new Error('Fetch ended in undefined Result'));
                }
            }).catch(error => {
                console.warn(error);
            }).finally(() => {
                setLoading(false);
            });
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