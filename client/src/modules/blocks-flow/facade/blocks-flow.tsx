import type { Position } from "../domain/position"
import { blocksRelations, type Block } from "../domain/block"
import { useBlockTypes } from "../model/use-block-types"
import { useCreateRelation } from "../model/use-create-relation"
import { BlockView } from "../ui/block"
import { Port } from "./port"
import { Root } from "../ui/root"
import { ArrowUI } from "../ui/array"
import { usePortPositions } from "../view-model/use-ports-positions"

export const BlocksFlow = ({
    blocks,
    onFlowClick, 
    onChanged
}: {
    blocks: Block[],
    onFlowClick: (position: Position) => void
    onChanged?: () => void
}) => {
    const blockTypes = useBlockTypes((state) => state.getData());
    const isSelection = useCreateRelation(state => state.isSelection())
    const unselectPort = useCreateRelation(state => state.unselectPort)
    const portPositions = usePortPositions()

    return (
        <Root
            onFieldClick={isSelection ? unselectPort : onFlowClick}  
            arrows={blocksRelations(blocks).map(relation => (
                    <ArrowUI
                        key={relation.id} 
                        blocks={blocks} 
                        portPositions={portPositions}
                        relation={relation} 
                    />
                ))
            }
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
