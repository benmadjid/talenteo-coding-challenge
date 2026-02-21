import { toast } from "sonner";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { EmployeeForm } from "../employee-form";
import { EmployeeFormSkeleton } from "../employee-form-skeleton";
import { useUpdateEmployee } from "../../data/mutations";
import { useEmployee } from "../../data/queries";
import type { EmployeeFormValues } from "../../schemas/employee-schema";
import type { Employee } from "../../types/employee";
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

    const employeeId = employee?.id ?? "";
    const {
        data: employeeDetails,
        isLoading: isEmployeeLoading,
        isError: isEmployeeError,
    } = useEmployee(employeeId);

    const currentEmployee = employeeDetails ?? employee;

    const onSubmit = (values: EmployeeFormValues) => {
        if (!currentEmployee) return;

        updateEmployee(
            { id: currentEmployee.id, employee: values },
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
                        <>
                            {isEmployeeLoading && <EmployeeFormSkeleton />}

                            {isEmployeeError && (
                                <div className="py-8 text-center text-sm text-destructive">
                                    Failed to load employee details.
                                </div>
                            )}

                            {!isEmployeeLoading && !isEmployeeError && currentEmployee && (
                                <EmployeeForm
                                    employee={currentEmployee}
                                    onSubmit={onSubmit}
                                    onCancel={() => onOpenChange(false)}
                                    isSubmitting={isPending}
                                />
                            )}
                        </>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
