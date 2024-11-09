import { useEffect, useState } from "react";
import { processApi } from "../api";

export type ProcessListItem = {
    id: string;
    name: string;
}

export const useProcessList = () => {
    const [processList, setProcessList] = useState<ProcessListItem[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchList = () => {
        setIsLoading(true)

        processApi.list()
            .then(setProcessList)
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchList()
    }, [])

    const create = async (name: string) => {
        await processApi.create(name)

        fetchList()
    }

    const deleteProcess = async (processId: string) => {
        await processApi.delete(processId)

        fetchList()
    }

    const list = processList.map(process => ({
        ...process,
        onDelete: () => deleteProcess(process.id)
    }))

    return {
        isLoading,
        list,
        create,
    }
}