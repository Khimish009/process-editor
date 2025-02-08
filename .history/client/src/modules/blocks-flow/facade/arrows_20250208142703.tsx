import { Block, blocksRecord, blocksRelations, getRelationsPositions } from "../domain/block"
import { useOptimisticCreateRelation } from "../model/create-relation"
import { useOptimisticDeleteRelations } from "../model/delete-relations"
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
    relations = useOptimisticCreateRelation(relations)

    const arrows = getRelationsPositions({
        relations,
        blocksRecord: record,
        portPositions
    })

    return (
        <>
            {arrows.map(relation => (
                <ArrowUI
                    key={relation.id}
                    start={relation?.inputPosition}
                    end={relation?.outputPosition}
                    isSelected={selected[relation.id]}
                    onClick={() => toggleRelation(relation.id)}
                />
            ))}
        </>
    )
}