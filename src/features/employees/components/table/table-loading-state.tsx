import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface TableLoadingStateProps {
    /** Number of columns to render skeleton cells for */
    columnCount: number
    /** Number of skeleton rows to show */
    rowCount?: number
}

export function TableLoadingState({
    columnCount,
    rowCount = 5,
}: TableLoadingStateProps) {
    return (
        <>
            {Array.from({ length: rowCount }).map((_, i) => (
                <TableRow key={i}>
                    {Array.from({ length: columnCount }).map((_, j) => (
                        <TableCell key={j}>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
}
