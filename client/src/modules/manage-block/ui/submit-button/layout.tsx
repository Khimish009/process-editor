import styles from "./styles.module.css"

export const Layout = ({ formId }: { formId: string }) => {
    return <button className={styles.root} form={formId}>Сохранить</button>
}