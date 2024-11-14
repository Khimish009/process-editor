import { useProcess } from "./model/use-process"
import { Root } from "./ui/root"
import { useProcessId } from "./model/use-process-id"
import { BloksFlow } from "../../modules/blocks-flow"
import { CreateBlockModal, useStartCreate } from "../../modules/manage-block"

export const Page = () => {
    const processId = useProcessId()
    const { process, isLoading, refetch } = useProcess(processId)
    const startCreate = useStartCreate()

    return (
        <Root 
            process={process}
            flow={process && <BloksFlow blocks={process.blocks} onFlowClick={startCreate} />}
            isLoading={isLoading}
            modals={
                <CreateBlockModal
                    processId={processId}
                    onSuccess={refetch}
                />
            }
        />
    )
}