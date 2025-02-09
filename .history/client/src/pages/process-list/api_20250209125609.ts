import { ProcessListItem } from "./model/use-list"

async function list() {
    return await fetch('/api/processes').then((res) => {
        return res.json() as Promise<ProcessListItem[]>
    })
}

async function create(name: string) {
    return await fetch('/api/processes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    })
}

async function deleteProcess(id: string) {
    return fetch(`/api/processes/${id}`, {
        method: "DELETE"
    })
}

export const processApi = {
    list,
    create,
    deleteProcess
}