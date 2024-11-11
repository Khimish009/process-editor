import { Modal } from "./ui/modal"

export const Facade = ({ 
    isOpen,
    onClose
}: { 
    isOpen?: boolean,
    onClose: () => void
}) => {
    if (!isOpen) {
        return null
    }
    
    return (
        <Modal 
            title="Create block"
            body={<div>body</div>}
            footer={null}
            onClose={onClose}
        />
    )
}