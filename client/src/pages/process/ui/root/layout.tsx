import React from "react"
import styles from "./styles.module.css"

export const Layout = ({
    process,
    flow,
    modals,
    isLoading
}: {
    process?: {
        name: string
    },
    flow: React.ReactNode
    modals: React.ReactNode
    isLoading: boolean
}) => {
    return (
        <div className={styles.root}>
            {process && <h1 className={styles.title}>Process: {process.name}</h1>}
            {isLoading && <div className={styles.loading}>loading...</div>}
            {flow}
            {modals}
        </div>
    )
}