import { useProcessList } from "./model/use-process-list"
import { CreateProcessForm } from "./ui/create-process-form"
import { ProcessCard } from "./ui/process-card"
import { Root } from "./ui/root"

export const Page = () => {
    const { isLoading, list, create } = useProcessList()
    
    return (
        <Root
            createForm={<CreateProcessForm onSubmit={create} />}
            isLoading={isLoading}
            cards={list.map(({ name, id, onDelete }) => (
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