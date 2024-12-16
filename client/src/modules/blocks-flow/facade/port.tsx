import type { Block } from "../domain/block"
import { getPortId } from "../domain/port"
import { useCreateRelation } from "../model/use-create-relation"
import { PortView } from "../ui/port"
import { usePortPositions } from "../view-model/use-ports-positions"

export function Port({ 
    port,
    label,
    blockId,
    type,
    blocks,
    onCreateArrow
}: { 
    port: string
    label: string
    blockId: string
    type: "input" | "output"
    blocks: Block[]
    onCreateArrow?: () => void
})  {
    const portInfo = {
        blockId, 
        type,
        port: port
    }

    const id = getPortId(portInfo)

    const getIsSelectedPort = useCreateRelation(state => state.getIsSelectedPort(portInfo))
    const getIsCanEndSelection = useCreateRelation(state => state.getIsCanEndSelection(portInfo, blocks))
    const selectPort = useCreateRelation((state) => state.selectPort);
    const setPortPosition = usePortPositions(state => state.setPortPosition)

    return ( 
        <PortView
            key={port}
            type={type}
            id={id}
            text={label}
            isSelected={getIsSelectedPort}
            isCanEndSelection={getIsCanEndSelection}
            onTargetClick={() => selectPort(portInfo, blocks, onCreateArrow)}
            onTargetPosition={setPortPosition}
        />
    )
}