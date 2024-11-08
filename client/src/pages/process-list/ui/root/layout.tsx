import React from "react"
import styles from "./styles.module.css"

export const Layout = ({
    createForm,
    cards: card
}: {
    createForm: React.ReactNode,
    cards: React.ReactNode
}) => {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>process list</h1>
            {createForm}
            <div className={styles.list}>{card}</div>
        </div>
    )
}