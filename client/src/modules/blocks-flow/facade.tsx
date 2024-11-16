import type { Block } from "./model/types/block"
import type { FlowPosition } from "./model/types/flow"
import { PortInfo } from "./model/types/port"
import { useBlockTypes } from "./model/use-block-types"
import { useCreateRelation } from "./model/use-create-relation"
import { Arrows } from "./ui/arrows"
import { BlockView } from "./ui/block"
import { Field } from "./ui/field"
import { Port } from "./ui/port"
import { Root } from "./ui/root"

export const Facade = ({
    blocks,
    onFlowClick, 
    onChanged
}: {
    blocks: Block[],
    onFlowClick: (position: FlowPosition) => void
    onChanged?: () => void
}) => {
    const blockTypes = useBlockTypes()
    const createRelation = useCreateRelation(blocks, onChanged)

    return (
        <Root 
            field={<Field onClick={onFlowClick} />}
            blocks={blocks.map(block => (
                <BlockView
                    key={block.id} 
                    block={block}
                    blockTypesRecord={blockTypes.data}
                    renderPort={(type, config) => {
                        const portInfo: PortInfo = {
                            blockId: block.id,
                            type,
                            port: config.port
                        }
 
                        return (
                            <Port
                                key={config.port}
                                type={type} 
                                text={config.label}
                                isSelected={createRelation.getIsSelected(portInfo)}
                                isCanSelected={createRelation.getIsCanSelectedEnd(portInfo)}
                                onTargetClick={() => createRelation.selectPort(portInfo)}
                            />
                        )
                    }}
                />
            ))}
            arrows={<Arrows />}
        />
    )
}