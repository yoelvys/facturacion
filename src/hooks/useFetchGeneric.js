import { useEffect, useState } from "react"

export const useFetchGeneric = (fetchFuntion) => {
    
    const [state, setstate] = useState({
        data: [],
        loading: true
    })

    useEffect(() => {
        fetchFuntion().then(data => setstate({ 
            data,
            loading: false
        }));
    }, [fetchFuntion])
    return state;
}