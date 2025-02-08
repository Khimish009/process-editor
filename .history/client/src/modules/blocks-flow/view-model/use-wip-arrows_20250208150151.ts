import { useMousePosition } from "../../../shared/use-mouse-positions"
import { useSelectedPortStore } from "../model/create-relation/use-selected-port-store"

export const useWipArrows = (selectedPort: ) => {
    const { selectedPort } = useSelectedPortStore()
    const mousePosition = useMousePosition(!!selectedPort)
    
}