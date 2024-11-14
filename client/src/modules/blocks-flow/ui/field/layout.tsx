import React from "react"
import styles from "./styles.module.css"
import { FlowPosition } from "../../model/types"

export const Layout = ({
    onClick,
}: {
    onClick: ({ x, y }: FlowPosition) => void
}) => {
    const handleClick = (e: React.MouseEvent) => {
        onClick({
            x: e.clientX,
            y: e.clientY
        })
    }
    return (
        <div className={styles.field} onClick={handleClick}>
        </div>
    )
}