import { createRoute } from "@tanstack/react-router"
import { appLayoutRoute } from "../_app"
import { EmployeesView } from "@/features/employees/views/employees-view"

export const employeesRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/employees",
    component: EmployeesView,
})
