import { useLoad } from "../../../shared/use-load";
import { ProcessApi } from "../api";

export const useList = (processApi: ProcessApi) => {
    const { 
        data: processList = [],
        isLoading,
        refetch
    } = useLoad(() => processApi.list())

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