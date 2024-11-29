import { useEffect, useState } from "react"

export const useLoad = <T>(fetcher: () => Promise<T>) => {
    const [data, setData] = useState<T>()
    const [isLoading, setIsLoading] = useState(true)

    const fetch = () => {
        setIsLoading(true)

        fetcher
            .then(setData)
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetch()
    }, [])


    return {
        data,
        isLoading,
        refetch: fetch
    }
}