import { useId } from "react"
import { Modal } from "../ui/modal"
import { SubmitButton } from "../ui/submit-button"
import { useCreateBlock } from "../model/useCreateBlock"
import { CreateForm } from "./create-form"

export const CreateBlockModal = ({ 
    processId,
    onSuccess
}: { 
    processId: string
    onSuccess: () => void
}) => {
    const formId = useId()
    const createBlock = useCreateBlock()

    if (!createBlock.createPosition) {
        return null
    }
    
    return (
        <Modal 
            title="Create block"
            body={
                <CreateForm
                    formId={formId}
                    onSuccess={onSuccess}
                    processId={processId}
                />
            }
            footer={<SubmitButton formId={formId} />}
            onClose={createBlock.cancelCreate}
        />
    )
}