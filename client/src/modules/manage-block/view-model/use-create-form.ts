import React, { useState } from "react"
import { type BlockType, BlockTypes } from "../model/types"

export type FormData = {
    name: string
    type: BlockType
    data: string
}

export type WebhookFormData = {
    url: string
    method: string
}

export const useFormCreate = (onSubmit: (formData: FormData) => void) => {
    const [formData, setFormData] = useState<FormData>({
        name: "Start",
        type: BlockTypes.Start,
        data: "{}"
    })

    const webhookFormData: WebhookFormData = formData.type === BlockTypes.Webhook 
        ? JSON.parse(formData.data)
        : undefined

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value
        setFormData((formData) => ({...formData, type, name: type, data: "{}"}))
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((formData) => ({...formData, name: e.target.value}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleChangeWebhookFormData = (data: WebhookFormData) => {
        setFormData((formData) => ({ ...formData, data: JSON.stringify(data)}))
    }

    return {
        formData,
        webhookFormData,
        handleTypeChange,
        handleNameChange,
        handleSubmit,
        handleChangeWebhookFormData
    }
}