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
import { useDeleteEmployee } from "../../data/mutations";
import type { Employee } from "../../types/employee";

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
                toast.success("Employee deleted successfully");
                onOpenChange(false);
            },
            onError: (error) => {
                toast.error(error instanceof Error ? error.message : "Failed to delete employee");
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
