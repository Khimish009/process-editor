import type { Position } from "../domain/position"
import { type Block } from "../domain/block"
import { useBlockTypes } from "../model/use-block-types"
import { useUnselectPort } from "../model/create-relation/use-create-relation"
import { BlockView } from "../ui/block"
import { Port } from "./port"
import { Root } from "../ui/root"
import { Arrows } from "./arrows"
import { useDelete } from "./use-delete"

export const BlocksFlow = ({
    blocks,
    onFlowClick, 
    onChanged,
}: {
    blocks: Block[],
    onFlowClick: (position: Position) => void
    onChanged: () => Promise<void>
}) => {
    const blockTypes = useBlockTypes((state) => state.getData());
    const { isSelection, unselectPort } = useUnselectPort()

    useDelete(onChanged)

    return (
        <Root
            onFieldClick={isSelection ? unselectPort : onFlowClick}  
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
