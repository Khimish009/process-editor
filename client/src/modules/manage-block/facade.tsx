import { useId } from "react"
import { CreateForm } from "./ui/create-form"
import { Modal } from "./ui/modal"
import { SubmitButton } from "./ui/submit-button"
import type { BlockPosition } from "../../pages/process/model/types"
import { useCreateBlock } from "./model/useCreateBlock"

export const Facade = ({ 
    createPosition,
    processId,
    onClose,
    onSuccess
}: { 
    createPosition?: BlockPosition,
    processId: string
    onClose: () => void
    onSuccess: () => void
}) => {
    const formId = useId()
    const createBlock = useCreateBlock({
        processId,
        blockPosition: createPosition,
        onSuccess
    })

    if (!createPosition) {
        return null
    }
    
    return (
        <Modal 
            title="Create block"
            body={<CreateForm formId={formId} onSubmit={createBlock.startCreate} />}
            footer={
                <>
                    <SubmitButton formId={formId} />
                </>
            }
            onClose={onClose}
        />
    )
}