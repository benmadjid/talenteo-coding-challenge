import { useEmployees } from "../data/queries"
import { DataTable } from "../components/data-table"
import { EmployeeToolbar } from "../components/employee-toolbar"
import { useEmployeeStore } from "../store/use-employee-store"
import { useShallow } from "zustand/shallow"
import { useEffect, useState } from "react"
import { EditEmployeeModal } from "../components/edit-employee-modal"
import { DeleteEmployeeDialog } from "../components/delete-employee-dialog"
import type { Employee } from "../types/employee"

export function EmployeesPage() {
    const {
        filters,
        setIsAddModalOpen,
    } = useEmployeeStore(useShallow(state => ({
        filters: state.filters,
        setIsAddModalOpen: state.setIsAddModalOpen
    })))

    // --- Queries ---
    const { data, isLoading, isError } = useEmployees(filters)
    useEffect(() => {
        if (isLoading) return
        setEmployees(data)
    }, [data])
    const [employees, setEmployees] = useState(data)

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
