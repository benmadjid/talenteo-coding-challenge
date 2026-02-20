import { createRoute } from "@tanstack/react-router"
import { appLayoutRoute } from "../_app"
import { EmployeesPage } from "@/features/employees/pages/employees-page"

export const employeesRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/employees",
    component: EmployeesPage,
})
