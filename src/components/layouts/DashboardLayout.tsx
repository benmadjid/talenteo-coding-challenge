
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "@tanstack/react-router"
import { AddEmployeeModal } from "@/features/employees/components/add-employee-modal"
import { useEmployeeStore } from "@/features/employees/store/use-employee-store"
import { useShallow } from "zustand/shallow"
const DashboardLayout = () => {
    const { isAddModalOpen, setIsAddModalOpen } = useEmployeeStore(
        useShallow((state) => ({
            isAddModalOpen: state.isAddModalOpen,
            setIsAddModalOpen: state.setIsAddModalOpen,
        }))
    )

    return <SidebarProvider
        style={
            {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
        }
    >
        <AppSidebar variant="inset" />
        <SidebarInset>
            <SiteHeader />
            <Outlet />
        </SidebarInset>
        <AddEmployeeModal
            open={isAddModalOpen}
            onOpenChange={setIsAddModalOpen}
        />
    </SidebarProvider>
}
export default DashboardLayout