import { toast } from "sonner";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { EmployeeForm } from "../employee-form";
import { useCreateEmployee, getErrorMessage } from "../../data/mutations";
import type { EmployeeFormValues } from "../../schemas/employee-schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconUserPlus, IconX } from "@tabler/icons-react";
import React from "react";

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
                onSuccess: (data) => {
                    toast.success("Employee created successfully", {
                        description: `${data.firstName} ${data.lastName} has been added to the team.`,
                        icon: React.createElement(IconUserPlus, { size: 18 }),
                    });
                    onOpenChange(false);
                },
                onError: (error) => {
                    toast.error("Failed to create employee", {
                        description: getErrorMessage(error),
                        icon: React.createElement(IconX, { size: 18 }),
                    });
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
