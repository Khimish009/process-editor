import { useEffect, useState } from "react"
import type { Process } from "./types"
import { procesApi } from "../api"

export const useProcess = (id: string) => {
    const [process, setProcess] = useState<Process>()
    const [isLoading, setIsLoading] = useState(true)

    const fetchProcess = () => {
        setIsLoading(true)

        procesApi.getById(id)
            .then(setProcess)
            .finally(() => setIsLoading(false))
    }

    useEffect(() => fetchProcess(), [])

    return {
        process,
        isLoading
    }
}