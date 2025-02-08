import React from "react"
import styles from "./styles.module.css"
import type { Position } from "../../domain/position"

export const Layout = ({
    blocks,
    arrows,
    onFieldClick,
}: {
    blocks: React.ReactNode
    arrows: React.ReactNode
    onFieldClick: ({ x, y }: Position) => void
}) => {
    const handleFieldClick = (e: React.MouseEvent) => {
        onFieldClick({
            x: e.clientX,
            y: e.clientY
        })
    }

    return (
        <div className={styles.root}>
            <div className={styles.field} onClick={handleFieldClick}></div>
            {blocks}
            <svg className={styles.arrows}>{arrows}</svg>
        </div>
    )
}
