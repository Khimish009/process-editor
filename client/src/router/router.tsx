import { createBrowserRouter } from "react-router-dom"
import { Root } from "./root"
import { ProcessPage } from "../pages/process"
import { ProcessListPage } from "../pages/process-list"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <ProcessPage />
            },
            {
                path: "process/:id",
                element: <ProcessListPage />
            }
        ]
    }
])