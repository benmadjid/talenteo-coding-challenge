import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "../services/employee-service";
import { EMPLOYEE_KEYS } from "./keys";
import type { CreateEmployeeDto, UpdateEmployeeDto } from "../types/employee";
import { toast } from "sonner";
import { IconUserPlus, IconUserEdit, IconUserMinus, IconX } from "@tabler/icons-react";
import React from "react";

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: EMPLOYEE_KEYS.mutations.create(),
        mutationFn: (employee: CreateEmployeeDto) => employeeService.createEmployee(employee),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.lists() });
            toast.success("Employee created successfully", {
                description: `${data.firstName} ${data.lastName} has been added to the team.`,
                icon: React.createElement(IconUserPlus, { size: 18 }),
            });
        },
        onError: (error: any) => {
            toast.error("Failed to create employee", {
                description: error.response?.data?.message || "An unexpected error occurred.",
                icon: React.createElement(IconX, { size: 18 }),
            });
        }
    });
};

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: EMPLOYEE_KEYS.mutations.update(),
        mutationFn: ({ id, employee }: { id: string; employee: UpdateEmployeeDto }) =>
            employeeService.updateEmployee(id, employee),
        onSuccess: (data, { id }) => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.detail(id) });
            toast.success("Employee updated successfully", {
                description: `${data.firstName} ${data.lastName}'s profile has been updated.`,
                icon: React.createElement(IconUserEdit, { size: 18, className: "text-blue-500" }),
            });
        },
        onError: (error: any) => {
            toast.error("Failed to update employee", {
                description: error.response?.data?.message || "An unexpected error occurred.",
                icon: React.createElement(IconX, { size: 18 }),
            });
        }
    });
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: EMPLOYEE_KEYS.mutations.delete(),
        mutationFn: (id: string) => employeeService.deleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.lists() });
            toast.success("Employee deleted successfully", {
                description: `Employee has been removed from the system.`,
                icon: React.createElement(IconUserMinus, { size: 18, className: "text-red-500" }),
            });
        },
        onError: (error: any) => {
            toast.error("Failed to delete employee", {
                description: error.response?.data?.message || "An unexpected error occurred.",
                icon: React.createElement(IconX, { size: 18 }),
            });
        }
    });
};
