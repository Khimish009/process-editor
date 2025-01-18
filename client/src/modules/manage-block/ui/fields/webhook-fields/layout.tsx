import { WebhookFormData } from "../../../view-model/use-create-form"
import styles from "./styles.module.css"

export const Layout = ({
    formData,
    onChangeFormData
}: {
    formData: WebhookFormData,
    onChangeFormData: (formData: WebhookFormData) => void
}) => {
    return (
        <>
            <input 
                className={styles.input}
                name="url"
                type="text"
                required
                value={formData.url}
                onChange={(e) => onChangeFormData({ ...formData, url: e.target.value })}
            />
            <select 
                className={styles.input}
                name="method"
                value={formData.method}
                onChange={(e) => onChangeFormData({ ...formData, method: e.target.value })}
            >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
            </select>
        </>
    )
}
