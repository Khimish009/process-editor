import { Root } from "./ui/root"

export const Facade = ({ isOpen }: { isOpen?: boolean }) => {
    if (!isOpen) {
        return null
    }
    
    return (
        <Root />
    )
}