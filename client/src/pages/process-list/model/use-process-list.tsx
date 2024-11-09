import { useState } from "react";

export type ProcessListItem = {
    id: string;
    name: string;
}

export const useProcessList = () => {
    const [processList, setProcessList] = useState<ProcessListItem[]>([])

    const create = (name: string) => {
        setProcessList((list) => [...list, { id: String(new Date()), name }])
    }

    const deleteProcess = (processId: string) => {
        setProcessList((list) => list.filter(({ id }) => id !== processId))
    }

    const list = processList.map(process => ({
        ...process,
        onDelete: () => deleteProcess(process.id)
    }))

    return {
        list,
        create,
    }
}