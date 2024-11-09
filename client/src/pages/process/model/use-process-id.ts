import { useParams } from "react-router"

export const useProcessId = () => {
    const { id } = useParams()

    return id!
}