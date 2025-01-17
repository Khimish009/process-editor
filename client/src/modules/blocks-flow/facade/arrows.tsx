import { Block, blocksRecord, blocksRelations } from "../domain/block"
import { ArrowUI } from "../ui/array"
import { usePortPositions } from "../view-model/use-ports-positions"

export const Arrows = ({ blocks }: { blocks: Block[] }) => {
    const portPositions = usePortPositions()
    const record = blocksRecord(blocks) 

    return (
        <>
            {blocksRelations(blocks).map(relation => (
                <ArrowUI
                    key={relation.id}  
                    blocksRecord={record} 
                    portPositions={portPositions}
                    relation={relation} 
                />
            ))}
        </>
    )
}