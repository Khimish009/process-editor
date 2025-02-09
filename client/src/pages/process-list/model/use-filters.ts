import { useDeferredValue, useState } from "react"

export const useProcessFilters = <T extends { name: string }>(
    items: T[]
) => {
    const [searchTerm, setSearchTerm] = useState('')
    const deferredSearchTerm = useDeferredValue(searchTerm)

    const filteredList = items.filter(({ name }) => 
        name.toLowerCase().includes(deferredSearchTerm.toLowerCase()))

    return {
        filteredList,
        searchTerm,
        setSearchTerm
    }
}