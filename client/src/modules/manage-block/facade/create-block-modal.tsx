import { useId } from "react"
import { CreateForm } from "../ui/create-form"
import { Modal } from "../ui/modal"
import { SubmitButton } from "../ui/submit-button"
import { useCreateBlock } from "../model/useCreateBlock"

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
                    onSubmit={(data) =>
                        createBlock.submitCreate({ processId, ...data }).then(onSuccess)
                    } 
                />
            }
            footer={<SubmitButton formId={formId} />}
            onClose={createBlock.cancelCreate}
        />
    )
}