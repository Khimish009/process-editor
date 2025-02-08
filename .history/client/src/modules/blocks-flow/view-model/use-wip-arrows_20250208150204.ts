import { useMousePosition } from "../../../shared/use-mouse-positions"
import { Port } from "../domain/port"
import { useSelectedPortStore } from "../model/create-relation/use-selected-port-store"

export const useWipArrows = (selectedPort?: Port) => {
    const mousePosition = useMousePosition(!!selectedPort)
    
}