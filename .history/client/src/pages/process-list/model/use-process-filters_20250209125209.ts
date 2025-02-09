import { useDeferredValue, useState } from "react"

export const useProcessFilters = (
    processes: {
        id: string,
        name: string,
        onDelete: () => void 
    }[]
) => {
    const [searchTerm, setSearchTerm] = useState('')
    const deferredSearchTerm = useDeferredValue(searchTerm)

    const filteredProcesses = processes.filter(({ name }) => 
        name.toLowerCase().includes(deferredSearchTerm.toLowerCase()))

    return {
        filteredProcesses,
        searchTerm,
        setSearchTerm
    }
}