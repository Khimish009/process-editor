import { useEffect, useState } from "react"

export const useLoad = <T>(fetcher: () => Promise<T>) => {
    const [data, setData] = useState<T>()
    const [isLoading, setIsLoading] = useState(true)

    const fetch = () => fetcher().then(setData)

    useEffect(() => {
        setIsLoading(true)
        fetch().finally(() => setIsLoading(false))
    }, [])


    return {
        data,
        isLoading,
        refetch: fetch
    }
}