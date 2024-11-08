import styles from "./styles.module.css"

export const Layout = () => {
    return (
        <div className={styles.root}>
            <input 
                className={styles.input}
                type="text"
                placeholder="process name"
            />
            <button className={styles.btn}>create</button>
        </div>
    )
}