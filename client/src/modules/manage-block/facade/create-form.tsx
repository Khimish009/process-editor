import { useCreateBlock } from "../model/useCreateBlock"
import { DefaultFields } from "../ui/fields/default-fields"
import { WebhookFields } from "../ui/fields/webhook-fields"
import { FormRoot } from "../ui/form-root"
import { useCreateForm } from "../view-model/use-create-form"

export const CreateForm = ({
    formId,
    processId,
    onSuccess,
}: {
	formId: string
    processId: string
    onSuccess: () => void 
}) => {
    const createBlock = useCreateBlock()
	const createForm = useCreateForm((data) =>
        createBlock.submitCreate({ processId, ...data }).then(onSuccess))

	return (
		<FormRoot
			formId={formId}
			onSubmit={createForm.handleSubmit}
		>
			<DefaultFields 
				formData={createForm.formData}
				onNameChange={createForm.handleNameChange}
				onTypeChange={createForm.handleTypeChange}
			/>
			{createForm.webhookFormData && (
				<WebhookFields 
					formData={createForm.webhookFormData}
					onChangeFormData={createForm.handleChangeWebhookFormData}
				/>
			)}
		</FormRoot>
	)
}
