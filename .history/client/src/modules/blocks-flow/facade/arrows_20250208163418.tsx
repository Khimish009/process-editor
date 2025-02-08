import { Block, getBlocksRecord, blocksRelations, getRelationsPositions } from "../domain/block"
import { useOptimisticCreateRelation } from "../model/create-relation"
import { useOptimisticDeleteRelations } from "../model/delete-relations"
import { useSelected } from "../model/use-selected"
import { ArrowUI } from "../ui/arrow"
import { usePortPositions } from "../view-model/use-ports-positions"

export const Arrows = ({ blocks }: { blocks: Block[] }) => {
    const portPositions = usePortPositions()
    const blocksRecord = getBlocksRecord(blocks)
    const selected = useSelected(state => state.selectedRelations)
    const toggleRelation = useSelected(state => state.toggleRelation)

    const relations = blocksRelations(blocks)
    const optimisticDeleteRelations = useOptimisticDeleteRelations(relations)
    const [relations] = useOptimisticCreateRelation({
        relations: optimisticDeleteRelations,
        blocksRecord,
        portPositions
    })

    const arrows = getRelationsPositions({
        relations,
        blocksRecord,
        portPositions
    })

    return (
        <>
            {arrows.map(({ id, inputPosition, outputPosition }) => (
                <ArrowUI
                    key={id}
                    start={inputPosition}
                    end={outputPosition}
                    isSelected={selected[id]}
                    onClick={() => toggleRelation(id)}
                />
            ))}
        </>
    )
}