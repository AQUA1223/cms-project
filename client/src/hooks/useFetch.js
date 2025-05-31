import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                if (isMounted) {
                    setData(json);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [url, JSON.stringify(options)]);
    // Add a refetch function to allow manual re-fetching
    const refetch = () => {
        setLoading(true);
        setError(null);
        let isMounted = true;
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                if (isMounted) {
                    setData(json);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });
        return () => {
            isMounted = false;
        };
    };
    return { data, loading, error, refetch };
};

export default useFetch;