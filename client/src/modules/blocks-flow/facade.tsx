import { Block, FlowPosition } from "./model/types"
import { useBlockTypes } from "./model/use-block-types"
import { Arrows } from "./ui/arrows"
import { BlockView } from "./ui/block"
import { Field } from "./ui/field"
import { Port } from "./ui/port"
import { Root } from "./ui/root"

export const Facade = ({
    blocks,
    onFlowClick,
}: {
    blocks: Block[],
    onFlowClick: (position: FlowPosition) => void
}) => {
    const blockTypes = useBlockTypes()

    return (
        <Root 
            field={<Field onClick={onFlowClick} />}
            blocks={blocks.map(block => (
                <BlockView
                    key={block.id} 
                    block={block}
                    blockTypesRecord={blockTypes.data}
                    renderPort={(type, config) => <Port key={config.port} type={type} text={config.label} />}
                />
            ))}
            arrows={<Arrows />}
        />
    )
}