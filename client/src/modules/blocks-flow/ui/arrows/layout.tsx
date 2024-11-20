import styles from "./styles.module.css"

export const Layout = ({ arrowsD }: { arrowsD: string }) => {
    return (
        <svg className={styles.arrows}>
            <path d={arrowsD} fill="none" stroke="black" />
        </svg>
    )
}