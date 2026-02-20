import { rootRoute } from "./__root"
import { appLayoutRoute } from "./_app"
import { indexRoute } from "./index"
import { documentsRoute } from "./documents/documents.route"
import { employeesRoute } from "./employees/employees.route"
export const routeTree = rootRoute.addChildren([
    appLayoutRoute.addChildren([indexRoute, documentsRoute, employeesRoute]),
])

