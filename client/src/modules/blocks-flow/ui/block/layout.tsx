import type { Block } from "../../domain/block"
import type { BlockTypesRecord, PortConfig } from "../../domain/block-types"
import styles from "./styles.module.css"
import React from "react"

export const Layout = ({
    block,
    blockTypesRecord,
    renderPort
}: {
    block: Block
    blockTypesRecord: BlockTypesRecord,
    renderPort?: (type: "input" | "output", data: PortConfig) => React.ReactNode
}) => {
    const blockType = blockTypesRecord[block.type]

    if (!blockType) {
        return null
    }

    return (
        <div 
            className={styles.block} 
            style={{ 
                left: block.x, 
                top: block.y 
            }}>
            {block.name}
            <div className={styles.ports}>
                <div className={styles.portSlot}>
                    {blockType.inputs?.map(input => renderPort?.("input", input))}
                </div>
                <div className={styles.portSlot}>
                    {blockType.outputs?.map(output => renderPort?.("output", output))}
                </div>
            </div>
        </div>
    )
}