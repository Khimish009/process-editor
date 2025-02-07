import type { Block } from "../domain/block"
import { getPortId } from "../domain/port"
import { useSelectPort } from "../model/use-create-relation"
import { PortView } from "../ui/port"
import { usePortPositionsReader } from "../view-model/use-ports-positions"

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
    onCreateArrow?: () => Promise<void>
})  {
    const portInfo = {
        blockId, 
        type,
        port: port
    }

    const id = getPortId(portInfo)

    const { 
        selectPort,
        isSelectedPort, 
        isCanEndSelection 
    } = useSelectPort({
        port: portInfo,
        blocks, 
        onSuccess: onCreateArrow
    })
    const portRef = usePortPositionsReader(id)

    return ( 
        <PortView
            key={port}
            type={type}
            text={label}
            isSelected={isSelectedPort}
            isCanEndSelection={isCanEndSelection}
            onTargetClick={selectPort}
            portRef={portRef}
        />
    )
}