import { toast } from "sonner";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { EmployeeForm } from "./employee-form";
import { useUpdateEmployee } from "../data/mutations";
import type { EmployeeFormValues } from "../schemas/employee-schema";
import type { Employee } from "../types/employee";
import { useIsMobile } from "@/hooks/use-mobile";

interface EditEmployeeModalProps {
    employee: Employee | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditEmployeeModal({
    employee,
    open,
    onOpenChange,
}: EditEmployeeModalProps) {
    const { mutate: updateEmployee, isPending } = useUpdateEmployee();
    const isMobile = useIsMobile();

    const onSubmit = (values: EmployeeFormValues) => {
        if (!employee) return;

        updateEmployee(
            { id: employee.id, employee: values },
            {
                onSuccess: () => {
                    toast.success("Employee updated successfully");
                    onOpenChange(false);
                },
                onError: (error) => {
                    toast.error(error instanceof Error ? error.message : "Failed to update employee");
                },
            }
        );
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
            <DrawerContent className={isMobile ? "" : "h-full w-[500px] mt-0 rounded-none"}>
                <DrawerHeader>
                    <DrawerTitle>Edit Employee</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto px-4 pb-4">
                    {employee && (
                        <EmployeeForm
                            employee={employee}
                            onSubmit={onSubmit}
                            onCancel={() => onOpenChange(false)}
                            isSubmitting={isPending}
                        />
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
