import { getPortId } from "./domain/ports"
import type { Position } from "./domain/position"
import type { Block } from "./domain/block"
import { useBlockTypes } from "./model/use-block-types"
import { useCreateRelation } from "./model/use-create-relation"
import { Arrows } from "./ui/arrows"
import { BlockView } from "./ui/block"
import { Field } from "./ui/field"
import { Port } from "./ui/port"
import { Root } from "./ui/root"
import { useRenderArrows } from "./view-model/use-render-arrows"

export const Facade = ({
    blocks,
    onFlowClick, 
    onChanged
}: {
    blocks: Block[],
    onFlowClick: (position: Position) => void
    onChanged?: () => void
}) => {
    const blockTypes = useBlockTypes()
    const createRelation = useCreateRelation(blocks, onChanged)
    const renderArrows = useRenderArrows(blocks)

    return (
        <Root 
            field={
                <Field 
                    onClick={createRelation.isSelection 
                        ? createRelation.unselectPort
                        : onFlowClick
                    } 
                />
            }
            blocks={blocks.map(block => (
                <BlockView
                    key={block.id} 
                    block={block}
                    blockTypesRecord={blockTypes.data}
                    renderPort={(type, config) => {
                        const portInfo = {
                            blockId: block.id,
                            type,
                            port: config.port
                        }
 
                        return (
                            <Port
                                key={config.port}
                                type={type}
                                id={getPortId(portInfo)}
                                text={config.label}
                                isSelected={createRelation.getIsSelectedPort(portInfo)}
                                isCanEndSelection={createRelation.getIsCanEndSelection(portInfo)}
                                onTargetClick={() => createRelation.selectPort(portInfo)}
                                onTargetPosition={renderArrows.setPortPosition}
                            />
                        )
                    }}
                />
            ))}
            arrows={<Arrows />}
        />
    )
}