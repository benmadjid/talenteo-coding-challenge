
import { TableCell, TableRow } from "@/components/ui/table"

interface TableErrorStateProps {
    colSpan: number
    message?: string
}

export function TableErrorState({
    colSpan,
    message = "Failed to load employees. Please try again.",
}: TableErrorStateProps) {
    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                className="h-24 text-center text-destructive font-medium"
            >
                {message}
            </TableCell>
        </TableRow>
    )
}
