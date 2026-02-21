import {
    IconDotsVertical,
    IconGenderFemale,
    IconGenderMale,
} from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Employee } from "../../types/employee"
import { DragHandle } from "./drag-handle"

function getInitials(firstName: string, lastName: string) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export const columns: ColumnDef<Employee>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
        enableHiding: false
    },
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "name",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        header: "Name",
        cell: ({ row, table }) => {
            const employee = row.original
            const meta = table.options.meta as {
                onEdit?: (e: Employee) => void
            }
            return (
                <Button
                    variant="link"
                    className="text-foreground w-fit gap-2 px-0 text-left hover:no-underline"
                    onClick={() => meta?.onEdit?.(employee)}
                >
                    <Avatar size="sm">
                        <AvatarImage
                            src={employee.avatar}
                            alt={`${employee.firstName} ${employee.lastName}`}
                        />
                        <AvatarFallback>
                            {getInitials(
                                employee.firstName,
                                employee.lastName
                            )}
                        </AvatarFallback>
                    </Avatar>
                    {employee.firstName} {employee.lastName}
                </Button>
            )
        },
        enableHiding: false,

    },
    {
        accessorKey: "registratonNumber",
        header: () => (
            <div className="w-full text-right">Registration #</div>
        ),
        cell: ({ row }) => (
            <div className="text-right tabular-nums">
                {row.original.registratonNumber}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="text-muted-foreground">{row.original.email}</span>
        ),
    },

    {
        accessorKey: "dateOfBirth",
        header: () => (
            <div className="w-full text-right">Date of Birth</div>
        ),
        cell: ({ row }) => (
            <div className="text-right tabular-nums ">
                {new Date(row.original.dateOfBirth).toLocaleDateString()}
            </div>
        ),
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => {
            const icon = row.original.gender === "male" ? <IconGenderMale className="text-blue-500 " /> : <IconGenderFemale className="text-pink-500 " />
            return <Badge variant="outline" className="text-muted-foreground px-1.5 ">
                {icon}{row.original.gender}
            </Badge>
        },
    },
    {
        accessorKey: "jobTitle",
        header: "Job Title",
        cell: ({ row }) => (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.jobTitle}
            </Badge>
        ),
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.department}
            </Badge>
        ),
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const employee = row.original
            const meta = table.options.meta as {
                onEdit?: (e: Employee) => void
                onDelete?: (e: Employee) => void
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                            size="icon"
                        >
                            <IconDotsVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => meta?.onEdit?.(employee)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => meta?.onDelete?.(employee)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableHiding: false,
    },
]
