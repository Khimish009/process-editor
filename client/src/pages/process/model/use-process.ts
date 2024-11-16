import { useEffect, useState } from "react"
import type { Process } from "./types"
import { procesApi } from "../api"

export const useProcess = (id: string) => {
    const [process, setProcess] = useState<Process>()
    const [isLoading, setIsLoading] = useState(true)

    const fetchProcess = () => {
        return procesApi.getById(id).then(setProcess)
    }

    useEffect(() => {
        setIsLoading(true)

        fetchProcess().finally(() => setIsLoading(false))
    }, [])

    return {
        data: process,
        isLoading,
        refetch: fetchProcess
    }
}