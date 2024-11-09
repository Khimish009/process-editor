import { createBrowserRouter } from "react-router-dom"
import { ProcessPage } from "../pages/process"
import { ProcessListPage } from "../pages/process-list"
import { App } from "../app"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <ProcessListPage />
            },
            {
                path: "process/:id",
                element: <ProcessPage />
            }
        ]
    }
])