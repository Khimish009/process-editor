import { useParams } from "react-router"
import { useProcess } from "./model/use-process"
import { Root } from "./ui/root"

export const Page = () => {
    const { id } = useParams()
    const { process, isLoading } = useProcess(id!)

    return (
        <Root 
            process={process}
            isLoading={isLoading}
        />
    )
}