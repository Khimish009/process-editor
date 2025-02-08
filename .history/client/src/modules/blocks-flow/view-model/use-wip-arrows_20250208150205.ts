import { useMousePosition } from "../../../shared/use-mouse-positions"
import { Port } from "../domain/port"

export const useWipArrows = (selectedPort?: Port) => {
    const mousePosition = useMousePosition(!!selectedPort)
    
}