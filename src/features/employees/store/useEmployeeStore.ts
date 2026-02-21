import { create } from "zustand"
import type { EmployeeFilters } from "../types/employee"
import type {
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState
} from "@tanstack/react-table"

interface EmployeeState {
    filters: EmployeeFilters
    searchInput: string

    sorting: SortingState
    columnVisibility: VisibilityState
    rowSelection: Record<string, boolean>
    columnFilters: ColumnFiltersState
    pagination: PaginationState

    setFilters: (filters: Partial<EmployeeFilters>) => void
    setSearchInput: (input: string) => void

    setSorting: (sorting: SortingState | ((prev: SortingState) => SortingState)) => void
    setColumnVisibility: (visibility: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => void
    setRowSelection: (selection: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void
    setColumnFilters: (filters: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void
    setPagination: (pagination: PaginationState | ((prev: PaginationState) => PaginationState)) => void

    resetFilters: () => void

    isAddModalOpen: boolean
    setIsAddModalOpen: (open: boolean) => void
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    filters: {
        page: 1,
        limit: 2000,
        search: "",
    },
    searchInput: "",

    sorting: [],
    columnVisibility: {},
    rowSelection: {},
    columnFilters: [],
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    },

    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters }
        })),

    setSearchInput: (input) => set({ searchInput: input }),

    setSorting: (updater) =>
        set((state) => ({
            sorting: typeof updater === "function" ? updater(state.sorting) : updater
        })),

    setColumnVisibility: (updater) =>
        set((state) => ({
            columnVisibility: typeof updater === "function" ? updater(state.columnVisibility) : updater
        })),

    setRowSelection: (updater) =>
        set((state) => ({
            rowSelection: typeof updater === "function" ? updater(state.rowSelection) : updater
        })),

    setColumnFilters: (updater) =>
        set((state) => ({
            columnFilters: typeof updater === "function" ? updater(state.columnFilters) : updater
        })),

    setPagination: (updater) =>
        set((state) => ({
            pagination: typeof updater === "function" ? updater(state.pagination) : updater
        })),

    resetFilters: () => set({
        filters: { page: 1, limit: 2000, search: "" },
        searchInput: "",
        sorting: [],
        pagination: { pageIndex: 0, pageSize: 10 }
    }),

    isAddModalOpen: false,
    setIsAddModalOpen: (open) => set({ isAddModalOpen: open })
}))
