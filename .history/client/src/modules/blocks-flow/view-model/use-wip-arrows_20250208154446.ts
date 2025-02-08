import { useMousePosition } from "../../../shared/use-mouse-positions"
import { type Block, type BlockId, getPortPositions } from "../domain/block"
import type { Port, PortId } from "../domain/port"
import { Position } from "../domain/position"

export const useWipArrows = ({
    selectedPort,
    blocks,
    portPosition
}: {
    selectedPort?: Port 
    blocksRecord: Record<BlockId, Block>
    portPositions: Record<PortId, Position>
}) => {
    const mousePosition = useMousePosition(!!selectedPort)
    
    if (selectedPort) {
        const startPosition = getPortPositions({
            blocksRecord: blocks,
            portPositions,
            port: selectedPort

        })
    }

    return undefined
}