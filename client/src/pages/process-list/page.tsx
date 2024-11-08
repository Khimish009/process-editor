import { CreateProcessForm } from "./ui/create-process-form"
import { ProcessCard } from "./ui/process-card"
import { Root } from "./ui/root"

export const Page = () => {
    return (
        <Root 
            createForm={<CreateProcessForm />}
            cards={
                <>
                    <ProcessCard title="process 1" />
                    <ProcessCard title="process 2" />
                    <ProcessCard title="process 3" />
                </>
            }
        />
    )
}