import { createRoute } from "@tanstack/react-router"
import { appLayoutRoute } from "../_app"
import { DocumentsPage } from "@/features/documents/documents-page"

export const documentsRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/documents",
    component: DocumentsPage,
})
