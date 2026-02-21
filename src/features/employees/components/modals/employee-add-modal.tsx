import { toast } from "sonner";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { EmployeeForm } from "../employee-form";
import { useCreateEmployee } from "../../data/mutations";
import type { EmployeeFormValues } from "../../schemas/employee-schema";
import { useIsMobile } from "@/hooks/use-mobile";

interface AddEmployeeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddEmployeeModal({ open, onOpenChange }: AddEmployeeModalProps) {
    const { mutate: createEmployee, isPending } = useCreateEmployee();
    const isMobile = useIsMobile();

    const onSubmit = (values: EmployeeFormValues) => {
        createEmployee(
            { ...values, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.email}` },
            {
                onSuccess: () => {
                    toast.success("Employee created successfully");
                    onOpenChange(false);
                },
                onError: (error) => {
                    toast.error(error instanceof Error ? error.message : "Failed to create employee");
                },
            }
        );
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
            <DrawerContent className={"h-full md:w-[500px]! mt-0 rounded-none"}>
                <DrawerHeader>
                    <DrawerTitle>Add New Employee</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto px-4 pb-4">
                    <EmployeeForm
                        onSubmit={onSubmit}
                        onCancel={() => onOpenChange(false)}
                        isSubmitting={isPending}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
