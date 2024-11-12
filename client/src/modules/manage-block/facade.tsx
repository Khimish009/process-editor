import { useId } from "react"
import { CreateForm } from "./ui/create-form"
import { Modal } from "./ui/modal"
import { SubmitButton } from "./ui/submit-button"

export const Facade = ({ 
    isOpen,
    onClose
}: { 
    isOpen?: boolean,
    onClose: () => void
}) => {
    const formId = useId()

    if (!isOpen) {
        return null
    }
    
    return (
        <Modal 
            title="Create block"
            body={<CreateForm formId={formId} onSubmit={console.log} />}
            footer={
                <>
                    <SubmitButton formId={formId} />
                </>
            }
            onClose={onClose}
        />
    )
}