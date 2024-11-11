import { Root } from "./ui/modal"

export const Facade = ({ isOpen }: { isOpen?: boolean }) => {
    if (!isOpen) {
        return null
    }
    
    return (
        <Root />
    )
}