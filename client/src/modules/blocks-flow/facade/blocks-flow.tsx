import type { Position } from "../domain/position"
import { type Block } from "../domain/block"
import { useBlockTypes } from "../model/use-block-types"
import { useCreateRelation } from "../model/use-create-relation"
import { BlockView } from "../ui/block"
import { Port } from "./port"
import { Root } from "../ui/root"
import { Arrows } from "./arrows"
import { useKeysHandlers } from "../view-model/use-keys-handlers"
import { useDeleteRelation } from "../model/use-delete-relation"
import { useSelected } from "../model/use-selected"

export const BlocksFlow = ({
    blocks,
    onFlowClick, 
    onChanged,
    onCancelCreate
}: {
    blocks: Block[],
    onFlowClick: (position: Position) => void
    onChanged: () => void
    onCancelCreate: () => void
}) => {
    const blockTypes = useBlockTypes((state) => state.getData());
    const isSelection = useCreateRelation(state => state.isSelection())
    const unselectPort = useCreateRelation(state => state.unselectPort)

    const getSelectedRelations = useSelected(state => state.getSelectedRelationsArray)
    const resetSelectedRelations = useSelected(state => state.resetSelectedRelations)

    const { deleteRelations } = useDeleteRelation({
        getRelationsToDelete: getSelectedRelations,  
        onComplete: [onChanged, resetSelectedRelations]
    })

    useKeysHandlers({ 
        onDelete: deleteRelations,
        onCancelCreate
    })

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
