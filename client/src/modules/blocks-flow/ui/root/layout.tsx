import React from "react"
import styles from "./styles.module.css"

export const Layout = ({
    blocks,
    arrows,
    field
}: {
    blocks: React.ReactNode
    arrows: React.ReactNode
    field: React.ReactNode
}) => {
    return (
        <div className={styles.root}>
            {field}
            {blocks}
            {arrows}
        </div>
    )
}