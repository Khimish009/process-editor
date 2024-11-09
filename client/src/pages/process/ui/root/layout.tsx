import styles from "./styles.module.css"

export const Layout = ({
    process,
    isLoading
}: {
    process?: {
        name: string
    },
    isLoading: boolean
}) => {
    return (
        <div className={styles.root}>
            {process && <h1 className={styles.title}>{process.name}</h1>}
            {isLoading && <div className={styles.loading}>loading...</div>}
        </div>
    )
}