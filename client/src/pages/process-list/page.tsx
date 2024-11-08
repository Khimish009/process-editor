import { useProcessList } from "./model/use-process-list"
import { CreateProcessForm } from "./ui/create-process-form"
import { ProcessCard } from "./ui/process-card"
import { Root } from "./ui/root"

export const Page = () => {
    const { list, create } = useProcessList()
    
    return (
        <Root
            createForm={<CreateProcessForm onSubmit={create} />}
            cards={list.map(({ name, id, onDelete }) => (
                <ProcessCard
                    key={id}
                    name={name}
                    onDelete={onDelete}
                />
            ))}
        />
    )
}