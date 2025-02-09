import React from "react"
import styles from "./styles.module.css"

export const Layout = ({
    actionPanel
    createForm,
    filters,
    cards: card,
    isLoading
}: {
    createForm: React.ReactNode,
    filters: React.ReactNode,
    cards: React.ReactNode,
    isLoading: boolean
}) => {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>process list</h1>
            {createForm}

            {filters}

            <div className={styles.list}>
                {card}
                {isLoading && <div className={styles.loading}>loading...</div>}
            </div>
        </div>
    )
}