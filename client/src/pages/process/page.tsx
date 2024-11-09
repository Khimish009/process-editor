import { useProcess } from "./model/use-process"
import { Root } from "./ui/root"
import { useProcessId } from "./model/use-process-id"

export const Page = () => {
    const processId = useProcessId()
    const { process, isLoading } = useProcess(processId)

    return (
        <Root 
            process={process}
            isLoading={isLoading}
        />
    )
}