import { ProcessListItem } from "./model/use-process-list"

export const processApi = {
    async list() {
        return await fetch('/api/processes').then((res) => {
            return res.json() as Promise<ProcessListItem[]>
        })
    },

    async create(name: string) {
        return await fetch('/api/processes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name})
        })
    }
}