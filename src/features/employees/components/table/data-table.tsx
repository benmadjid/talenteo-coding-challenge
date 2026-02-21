import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from "@tabler/icons-react"
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type Row,
} from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Employee } from "../../types/employee"
import { columns } from "./columns"
import { TableEmptyState } from "./table-empty-state"
import { TableErrorState } from "./table-error-state"
import { TableLoadingState } from "./table-loading-state"
import { useEmployeeStore } from "../../store/useEmployeeStore"
import { useShallow } from "zustand/shallow"

// Draggable row wrapper
function DraggableRow({ row }: { row: Row<Employee> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}

interface DataTableProps {
    data: Employee[]
    isLoading?: boolean
    isError?: boolean
    /** When true, empty data is shown as "no search results" instead of "no data" */
    hasActiveSearch?: boolean
    onDataChange?: (newData: Employee[]) => void
    onEdit?: (employee: Employee) => void
    onDelete?: (employee: Employee) => void
}

export const DataTable = React.memo(({
    data,
    isLoading,
    isError,
    hasActiveSearch = false,
    onDataChange,
    onEdit,
    onDelete
}: DataTableProps) => {
    const store = useEmployeeStore(useShallow(state => ({
        sorting: state.sorting,
        columnVisibility: state.columnVisibility,
        rowSelection: state.rowSelection,
        columnFilters: state.columnFilters,
        pagination: state.pagination,
        setSorting: state.setSorting,
        setColumnVisibility: state.setColumnVisibility,
        setRowSelection: state.setRowSelection,
        setColumnFilters: state.setColumnFilters,
        setPagination: state.setPagination,
        setFilters: state.setFilters
    })))
    const sortableId = React.useId()
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting: store.sorting,
            columnVisibility: store.columnVisibility,
            rowSelection: store.rowSelection,
            columnFilters: store.columnFilters,
            pagination: store.pagination,
        },
        meta: {
            onEdit,
            onDelete,
        },
        getRowId: (row) => row.id,
        enableRowSelection: true,
        onRowSelectionChange: store.setRowSelection,
        onSortingChange: store.setSorting,
        onColumnFiltersChange: store.setColumnFilters,
        onColumnVisibilityChange: store.setColumnVisibility,
        onPaginationChange: store.setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    const dataIds = React.useMemo<UniqueIdentifier[]>(
        () => data?.map(({ id }) => id) || [],
        [data]
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            const oldIndex = dataIds.indexOf(active.id)
            const newIndex = dataIds.indexOf(over.id)
            const newData = arrayMove(data, oldIndex, newIndex)
            onDataChange?.(newData)
        }
    }
    return (
        <div className="relative flex flex-col gap-4 overflow-auto">
            <div className="overflow-hidden rounded-lg border">
                <DndContext
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                    id={sortableId}
                >
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="**:data-[slot=table-cell]:first:w-8">
                            {isLoading ? (
                                <TableLoadingState columnCount={columns.length} />
                            ) : isError ? (
                                <TableErrorState colSpan={columns.length} />
                            ) : table.getRowModel().rows?.length ? (
                                <SortableContext
                                    items={dataIds}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {table.getRowModel().rows.map((row) => (
                                        <DraggableRow
                                            key={row.id}
                                            row={row}
                                        />
                                    ))}
                                </SortableContext>
                            ) : (
                                <TableEmptyState
                                    colSpan={columns.length}
                                    variant={
                                        data.length === 0
                                            ? hasActiveSearch
                                                ? "no-search-results"
                                                : "no-data"
                                            : hasActiveSearch ? "no-search-results" : "no-filter-results"
                                    }
                                />
                            )}
                        </TableBody>
                    </Table>
                </DndContext>
            </div>
            <div className="flex items-center justify-between px-4">
                <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                    <div className="hidden items-center gap-2 lg:flex">
                        <Label
                            htmlFor="rows-per-page"
                            className="text-sm font-medium"
                        >
                            Rows per page
                        </Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger
                                size="sm"
                                className="w-20"
                                id="rows-per-page"
                            >
                                <SelectValue
                                    placeholder={
                                        table.getState().pagination.pageSize
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={`${pageSize}`}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <IconChevronsLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <IconChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <IconChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <IconChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
})
