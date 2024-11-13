import styles from "./styles.module.css"
import { WebhookFields } from "../fields/webhook-fields"
import { useFormCreate, type FormData } from "../../view-model/use-create-form"
import { DefaultFields } from "../fields/default-fields"

export const Layout = ({
    formId,
    onSubmit  
}: {
    formId: string
    onSubmit: (formData: FormData) => void 
}) => {
    const { 
        formData,
        webhookFormData,
        handleTypeChange,
        handleNameChange,
        handleSubmit,
        handleChangeWebhookFormData
    } = useFormCreate(onSubmit)

    return (
        <form className={styles.root} onSubmit={handleSubmit} id={formId}>
            <DefaultFields 
                formData={formData}
                onNameChange={handleNameChange}
                onTypeChange={handleTypeChange}
            />
            {webhookFormData && (
                <WebhookFields 
                    formData={webhookFormData}
                    onChangeFormData={handleChangeWebhookFormData}
                />  
            )}
        </form>
    )
}