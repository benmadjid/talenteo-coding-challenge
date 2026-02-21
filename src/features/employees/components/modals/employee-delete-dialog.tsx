import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteEmployee, getErrorMessage } from "../../data/mutations";
import type { Employee } from "../../types/employee";
import { IconUserMinus, IconX } from "@tabler/icons-react";
import React from "react";

interface DeleteEmployeeDialogProps {
    employee: Employee | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteEmployeeDialog({
    employee,
    open,
    onOpenChange,
}: DeleteEmployeeDialogProps) {
    const { mutate: deleteEmployee, isPending } = useDeleteEmployee();

    const onDelete = () => {
        if (!employee) return;

        deleteEmployee(employee.id, {
            onSuccess: () => {
                toast.success("Employee deleted successfully", {
                    description: "Employee has been removed from the system.",
                    icon: React.createElement(IconUserMinus, { size: 18, className: "text-red-500" }),
                });
                onOpenChange(false);
            },
            onError: (error) => {
                toast.error("Failed to delete employee", {
                    description: getErrorMessage(error),
                    icon: React.createElement(IconX, { size: 18 }),
                });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Employee</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-foreground">
                            {employee?.firstName} {employee?.lastName}
                        </span>
                        ? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete Employee"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
