import styles from "./styles.module.css"

export const Layout = ({
    name,
    onDelete
}: {
    name: string,
    onDelete?: () => void
}) => {
    return (
        <div className={styles.root}>
            <div className={styles.name}>{ name }</div>
            <button className={styles.deleteBtn} onClick={onDelete}>delete</button>
        </div>
    )
}