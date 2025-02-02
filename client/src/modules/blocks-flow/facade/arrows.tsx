import { Block, blocksRecord, blocksRelations } from "../domain/block"
import { useOptimisticDeleteRelations } from "../model/delete-relations"
import { useOptimisticCreateRelations } from "../model/use-create-relation"
import { useSelected } from "../model/use-selected"
import { ArrowUI } from "../ui/arrow"
import { usePortPositions } from "../view-model/use-ports-positions"

export const Arrows = ({ blocks }: { blocks: Block[] }) => {
    const portPositions = usePortPositions()
    const record = blocksRecord(blocks)
    const selected = useSelected(state => state.selectedRelations)
    const toggleRelation = useSelected(state => state.toggleRelation)

    let relations = blocksRelations(blocks)
    relations = useOptimisticDeleteRelations(relations)
    relations = useOptimisticCreateRelations(relations)

    return (
        <>
            {relations.map(relation => (
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