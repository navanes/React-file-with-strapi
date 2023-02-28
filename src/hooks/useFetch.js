import React, {useEffect, useState} from 'react';

function useFetch(url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //we are creating another function inside this
        //useEffect so we can make async and await inside it for fetching
        const fetchData = async() => {
            setLoading(true)
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json.data);
                setLoading(false)
            } catch (error) {
                setError(error);
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { data, error, loading }
}

export default useFetch;