import { useProcess } from "./model/use-process"
import { Root } from "./ui/root"
import { useProcessId } from "./model/use-process-id"
import { BloksFlow } from "../../modules/blocks-flow"
import { CreateBlockModal } from "../../modules/manage-block"
import { useBlockCreate } from "./model/use-block-create"

export const Page = () => {
    const processId = useProcessId()
    const { process, isLoading } = useProcess(processId)
    const createBlock = useBlockCreate()

    return (
        <Root 
            process={process}
            flow={process && <BloksFlow blocks={process.blocks} onFlowClick={createBlock.startCreate} />}
            isLoading={isLoading}
            modals={<CreateBlockModal isOpen={createBlock.isCreating} onClose={createBlock.stopCreate} />}
        />
    )
}