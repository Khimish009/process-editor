import { useProcessFilters } from "./model/use-filters"
import { useList } from "./model/use-list"
import { CreateProcessForm } from "./ui/create-process-form"
import { ProcessFilters } from "./ui/filters"
import { ProcessCard } from "./ui/process-card" 
import { Root } from "./ui/root"

export const Page = () => {
    const { isLoading, list, create } = useList()
    const { filteredList, searchTerm, setSearchTerm } = useProcessFilters(list)
    
    return (
        <Root
            actionsPanel={
                <>
                    <CreateProcessForm onSubmit={create} />
                    <ProcessFilters
                    value={searchTerm}
                    onChangeValue={setSearchTerm}
                />
                </>
            }
            isLoading={isLoading}
            list={filteredList.map(({ name, id, onDelete }) => (
                <ProcessCard
                    key={id}
                    id={id}
                    name={name}
                    onDelete={onDelete}
                />
            ))}
        />
    )
}