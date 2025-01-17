import { Block, blocksRelations } from "../domain/block"
import { ArrowUI } from "../ui/array"
import { usePortPositions } from "../view-model/use-ports-positions"

export const Arrows = ({ blocks }: { blocks: Block[] }) => {
    const portPositions = usePortPositions()

    return (
        <>
            {blocksRelations(blocks).map(relation => (
                <ArrowUI
                    key={relation.id} 
                    blocks={blocks} 
                    portPositions={portPositions}
                    relation={relation} 
                />
            ))}
        </>
    )
}