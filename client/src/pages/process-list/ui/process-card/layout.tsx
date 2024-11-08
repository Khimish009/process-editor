import styles from "./styles.module.css"

export const Layout = ({
    title,
    onDelete
}: {
    title: string,
    onDelete?: () => void
}) => {
    return (
        <div className={styles.root}>
            <div className={styles.title}>{ title }</div>
            <button className={styles.deleteBtn} onClick={onDelete}>delete</button>
        </div>
    )
}