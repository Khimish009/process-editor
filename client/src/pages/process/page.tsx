import { useProcess } from "./model/use-process"
import { Root } from "./ui/root"
import { useProcessId } from "./model/use-process-id"
import { BlocksFlow } from "../../modules/blocks-flow"
import { CreateBlockModal, useStartCreate } from "../../modules/manage-block"

export const Page = () => {
    const processId = useProcessId()
    const process = useProcess(processId)
    const startCreate = useStartCreate()

    return (
        <Root 
            process={process.data}
            flow={process.data && 
                <BlocksFlow 
                    blocks={process.data.blocks}
                    onFlowClick={startCreate}
                    onChanged={process.refetch} 
                />
            }
            isLoading={process.isLoading}
            modals={
                <CreateBlockModal
                    processId={processId}
                    onSuccess={process.refetch}
                />
            }
        />
    )
}