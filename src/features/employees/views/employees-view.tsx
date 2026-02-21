import { useEmployees } from "../data/queries"
import { DataTable } from "../components/table/data-table"
import { EmployeeToolbar } from "../components/employee-toolbar"
import { useEmployeeStore } from "../store/useEmployeeStore"
import { useShallow } from "zustand/shallow"
import { useEffect, useState } from "react"
import { EditEmployeeModal } from "../components/modals/employee-edit-modal"
import { DeleteEmployeeDialog } from "../components/modals/employee-delete-dialog"
import type { Employee } from "../types/employee"

export function EmployeesView() {
    const {
        filters,
        setIsAddModalOpen,
    } = useEmployeeStore(useShallow(state => ({
        filters: state.filters,
        setIsAddModalOpen: state.setIsAddModalOpen
    })))

    // --- Queries ---
    const { data, isLoading, isError } = useEmployees(filters)
    const [employees, setEmployees] = useState<Employee[]>(data ?? [])
    useEffect(() => {
        if (isLoading) return
        setEmployees(data ?? [])
    }, [data, isLoading])

    // --- Modal State ---
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
    const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null)

    const handleEditEmployee = (employee: Employee) => {
        setEditingEmployee(employee)
    }

    const handleDeleteEmployee = (employee: Employee) => {
        setDeletingEmployee(employee)
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-2 md:py-6 px-6">
                    <EmployeeToolbar onAddEmployee={() => setIsAddModalOpen(true)} />
                    <DataTable
                        data={employees ?? []}
                        isLoading={isLoading}
                        isError={isError}
                        onDataChange={setEmployees}
                        onEdit={handleEditEmployee}
                        hasActiveSearch={!!filters.search?.trim()}
                        onDelete={handleDeleteEmployee}
                    />
                </div>
            </div>


            <EditEmployeeModal
                employee={editingEmployee}
                open={!!editingEmployee}
                onOpenChange={(open) => !open && setEditingEmployee(null)}
            />

            <DeleteEmployeeDialog
                employee={deletingEmployee}
                open={!!deletingEmployee}
                onOpenChange={(open) => !open && setDeletingEmployee(null)}
            />
        </div>
    )
}
