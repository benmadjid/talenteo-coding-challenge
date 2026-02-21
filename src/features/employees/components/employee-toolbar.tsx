import {
    IconChevronDown,
    IconLayoutColumns,
    IconPlus,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tabs,

} from "@/components/ui/tabs"

import { Label } from "@/components/ui/label"
import { useEmployeeStore } from "../store/useEmployeeStore"
import { columns } from "./table/columns"
import { EmployeesSearch } from "./employee-search"
import { useShallow } from "zustand/shallow"

interface EmployeeToolbarProps {
    onAddEmployee?: () => void
}

export function EmployeeToolbar({
    onAddEmployee,
}: EmployeeToolbarProps) {
    const {
        columnVisibility,
        setColumnVisibility
    } = useEmployeeStore(useShallow((state) => ({ columnVisibility: state.columnVisibility, setColumnVisibility: state.setColumnVisibility })))

    const hideableColumns = columns.filter(
        (col) => col.enableHiding === undefined || col.enableHiding
    )
    const toggleColumn = (columnId: string, isVisible: boolean) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [columnId]: isVisible,
        }))
    }
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col lg:flex-row items-center items-stretch justify-between gap-2  w-full">
                <div className="flex items-center gap-2 flex-1">
                    <div className="relative w-full max-w-sm">
                        <EmployeesSearch />
                    </div>
                </div>

                <div className="flex items-center   gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <IconLayoutColumns className="size-4" />
                                <span className="hidden lg:inline">
                                    Customize Columns
                                </span>
                                <span className="lg:hidden">Columns</span>
                                <IconChevronDown className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {hideableColumns.map((column) => {
                                const columnId = column.id ?? (column as { accessorKey?: string }).accessorKey
                                if (!columnId) return null


                                const isVisible = columnVisibility[columnId] !== false

                                return (
                                    <DropdownMenuCheckboxItem
                                        key={columnId}
                                        className="capitalize"
                                        checked={isVisible}
                                        onCheckedChange={(value) =>
                                            toggleColumn(columnId, !!value)
                                        }
                                    >
                                        {columnId.replace(/([A-Z])/g, ' $1').trim()}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" onClick={onAddEmployee}>
                        <IconPlus className="size-4" />
                        <span className="hidden lg:inline">Add Employee</span>
                    </Button>
                </div>
            </div>

            <div className="px-4 lg:px-6">
                <Tabs defaultValue="all-employees" className="w-full">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="view-selector" className="sr-only">
                            View
                        </Label>


                    </div>
                </Tabs>
            </div>
        </div>
    )
}
