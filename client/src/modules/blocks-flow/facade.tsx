import { Block, FlowPosition } from "./model/types"
import { Arrows } from "./ui/arrows"
import { BlockView } from "./ui/block"
import { Field } from "./ui/field"
import { Root } from "./ui/root"

export const Facade = ({
    blocks,
    onFlowClick,
}: {
    blocks: Block[],
    onFlowClick: (position: FlowPosition) => void
}) => {
    return (
        <Root 
            field={<Field onClick={onFlowClick} />}
            blocks={blocks.map(block => (
                <BlockView key={block.id} block={block} />
            ))}
            arrows={<Arrows />}
        />
    )
}