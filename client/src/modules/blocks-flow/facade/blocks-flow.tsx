import type { Position } from "../domain/position"
import type { Block } from "../domain/block"
import { useBlockTypes } from "../model/use-block-types"
import { useCreateRelation } from "../model/use-create-relation"
import { Arrows } from "../ui/arrows"
import { BlockView } from "../ui/block"
import { Field } from "../ui/field"
import { Port } from "./port"
import { Root } from "../ui/root"
import { useRenderArrows } from "../view-model/use-render-arrows"

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
    const arrowsD = useRenderArrows(state => state.getArrowsD(blocks)) 

    return (
        <Root 
            field={<Field onClick={isSelection ? unselectPort : onFlowClick} />}
            arrows={<Arrows arrowsD={arrowsD} />}
            blocks={blocks.map(block => (
                <BlockView
                    key={block.id} 
                    block={block}
                    blockTypesRecord={blockTypes}
                    renderPort={(type, { port, label }) => (
                        <Port
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