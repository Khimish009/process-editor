import { ProcessListItem } from "./model/use-list"

export type ProcessApi = {
    list: () => Promise<ProcessListItem[]>
    create: (name: string) => Promise<unknown>
    deleteProcess: (id: string) => Promise<unknown>
}

export const processApi: ProcessApi =  {
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
    },
    
    async deleteProcess(id: string) {
        return fetch(`/api/processes/${id}`, {
            method: "DELETE"
        })
    }
}
