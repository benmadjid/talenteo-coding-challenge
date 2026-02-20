import { createRoute, redirect } from "@tanstack/react-router"
import { appLayoutRoute } from "./_app"

export const indexRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({ to: "/documents" })
    },
})
