import styles from "./styles.module.css"

export const Layout = () => {
    return (
        <svg className={styles.arrows}>
            <path d="M 0 0 L 10 5 L 0 10 z" fill="none" stroke="black" />
        </svg>
    )
}