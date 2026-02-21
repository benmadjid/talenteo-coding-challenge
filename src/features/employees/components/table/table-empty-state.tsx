import { TableCell, TableRow } from "@/components/ui/table"

export type TableEmptyStateVariant =
    | "no-data"
    | "no-search-results"
    | "no-filter-results"

interface TableEmptyStateProps {
    /** Number of columns to span */
    colSpan: number
    /** Determines the message shown to the user */
    variant: TableEmptyStateVariant
}

const MESSAGES: Record<TableEmptyStateVariant, string> = {
    "no-data":
        "No employees yet. Add your first employee to get started.",
    "no-search-results":
        "No employees match your search. Try different keywords or clear the search.",
    "no-filter-results":
        "No employees match your current filters. Try adjusting or clearing the column filters.",
}

export function TableEmptyState({ colSpan, variant }: TableEmptyStateProps) {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="h-24 text-center">
                <p className="text-muted-foreground text-sm">
                    {MESSAGES[variant]}
                </p>
            </TableCell>
        </TableRow>
    )
}
