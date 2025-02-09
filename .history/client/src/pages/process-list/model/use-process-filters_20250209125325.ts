import { useDeferredValue, useState } from "react"

export const useProcessFilters = <T extends { name: string }>(
    processes: T
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