import { ProcessListItem } from "./model/use-process-list"

export const processApi = {
    async list() {
        return await fetch('http://localhost:3000/processes').then((res) => {
            return res.json() as Promise<ProcessListItem[]>
        })
    },

    async create(name: string) {
        return await fetch('http://localhost:3000/processes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name})
        })
    }
}