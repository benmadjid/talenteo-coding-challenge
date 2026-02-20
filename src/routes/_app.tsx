import { createRoute, } from "@tanstack/react-router"
import { rootRoute } from "./__root"
import DashboardLayout from "@/components/layouts/DashboardLayout"
export const appLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "app-layout",
    component: DashboardLayout,
})
