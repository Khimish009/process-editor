import styles from "./styles.module.css"
import { BlockTypes } from "../../model/types"
import { WebhookFields } from "../webhook-fields"
import { useFormCreate, type FormData } from "../../view-model/use-create-form"

export const Layout = ({
    formId,
    onSubmit 
}: {
    formId: string
    onSubmit: (formData: FormData) => void 
}) => {
    const { 
        formData,
        handleTypeChange,
        handleNameChange,
        handleSubmit,
        hanldleDataChange,
    } = useFormCreate(onSubmit)

    return (
        <form className={styles.root} onSubmit={handleSubmit} id={formId}>
            <select 
                className={styles.input}
                name="type"
                required
                value={formData.type}
                onChange={handleTypeChange}
            >
                {Object.values(BlockTypes).map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <input 
                className={styles.input}
                name="name"
                type="text"
                placeholder=""
                required
                value={formData.name}
                onChange={handleNameChange}
            />
            {formData.type === BlockTypes.Webhook  && (
                <WebhookFields 
                    data={formData.data}
                    onChangeData={hanldleDataChange}
                />
            )}
        </form>
    )
}