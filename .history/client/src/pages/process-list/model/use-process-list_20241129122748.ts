import { processApi } from "../api";
import { useLoad } from "../../../shared/use-load";

export type ProcessListItem = {
    id: string;
    name: string;
}

export const useProcessList = () => {
    const { 
        data: processList = [],
        isLoading,
        refetch
    } = useLoad(processApi.list())

    const create = async (name: string) => {
        await processApi.create(name)

        refetch()
    }

    const deleteProcess = async (processId: string) => {
        await processApi.deleteProcess(processId)

        refetch()
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