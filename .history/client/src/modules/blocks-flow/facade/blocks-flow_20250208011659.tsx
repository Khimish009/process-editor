import type { Position } from "../domain/position"
import { type Block } from "../domain/block"
import { useBlockTypes } from "../model/use-block-types"
import { BlockView } from "../ui/block"
import { Port } from "./port"
import { Root } from "../ui/root"
import { Arrows } from "./arrows"
import { useDelete } from "./use-delete"
import { useUnselectPort } from "../model/create-relation"
import { Ref } from "react"

export const BlocksFlow = ({
    blocks,
    onFlowClick, 
    onChanged,
    rootRef,
}: {
    blocks: Block[],
    onFlowClick: (position: Position) => void
    onChanged: () => Promise<void>,
    rootRef: Ref<HTMLDivElement>
}) => {
    const blockTypes = useBlockTypes((state) => state.getData());
    const { isSelection, unselectPorts } = useUnselectPort()

    useDelete(onChanged)

    return (
        <Root
            ref={rootRef}
            onFieldClick={isSelection ? unselectPorts : onFlowClick}  
            arrows={<Arrows blocks={blocks} />}
            blocks={blocks.map(block => (
                <BlockView
                    key={block.id} 
                    block={block}
                    blockTypesRecord={blockTypes}
                    renderPort={(type, { port, label }) => (
                        <Port
                            key={`${block.id}${type}${label}`} 
                            type={type}
                            port={port} 
                            label={label}
                            blockId={block.id}
                            blocks={blocks}
                            onCreateArrow={onChanged}
                        />
                    )}
                />
            ))}
        />
    )
}
