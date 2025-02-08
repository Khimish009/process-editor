import { useMousePosition } from "../../../shared/use-mouse-positions"
import { type Block, type BlockId, getPortPositions } from "../domain/block"
import type { Port, PortId } from "../domain/port"
import { Position } from "../domain/position"

export const useWipArrows = ({
    selectedPort,
    blocks,
    portPositions
}: {
    selectedPort?: Port 
    blocks: Record<BlockId, Block>
    portPositions: Record<PortId, Position>
}) => {
    const mousePosition = useMousePosition(!!selectedPort)
    
    if (selectedPort && mousePosition) {
        return {
            startPosition: getPortPositions({
                blocksRecord: blocks,
                portPositions,
                port: selectedPort
            }),
            endPosition: mousePosition,
        }
    }

    return undefined
}