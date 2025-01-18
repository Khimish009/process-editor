import { Block, blocksRecord, blocksRelations } from "../domain/block"
import { useSelected } from "../model/use-selected"
import { ArrowUI } from "../ui/array"
import { usePortPositions } from "../view-model/use-ports-positions"

export const Arrows = ({ blocks }: { blocks: Block[] }) => {
    const portPositions = usePortPositions()
    const record = blocksRecord(blocks)
    const selected = useSelected(state => state.selectedRelations)
    const toggleRelation = useSelected(state => state.toggleRelation)

    return (  
        <>
            {blocksRelations(blocks).map(relation => (
                <ArrowUI
                    key={relation.id}  
                    blocksRecord={record} 
                    portPositions={portPositions}
                    relation={relation}
                    isSelected={selected[relation.id]}
                    onClick={() => toggleRelation(relation.id)}
                />
            ))}
        </>
    )
}