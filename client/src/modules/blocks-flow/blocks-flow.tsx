import { Block } from "./model/types"
import { Arrows } from "./ui/arrows"
import { BlockView } from "./ui/block"
import { Field } from "./ui/field"
import { Root } from "./ui/root"

export const BloksFlow = ({ blocks }: { blocks: Block[] }) => {
    return (
        <Root 
            field={<Field />}
            blocks={blocks.map(block => (
                <BlockView key={block.id} block={block} />
            ))}
            arrows={<Arrows />}
        />
    )
}