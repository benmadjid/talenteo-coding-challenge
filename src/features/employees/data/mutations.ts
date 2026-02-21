import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { employeeService } from "../services/employee-service";
import { EMPLOYEE_KEYS } from "./keys";
import type { CreateEmployeeDto, UpdateEmployeeDto } from "../types/employee";

export function getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError && error.response?.data && typeof error.response.data === "object" && "message" in error.response.data) {
        return String((error.response.data as { message?: string }).message);
    }
    return "An unexpected error occurred.";
}

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: EMPLOYEE_KEYS.mutations.create(),
        mutationFn: (employee: CreateEmployeeDto) => employeeService.createEmployee(employee),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.lists() });
        },
    });
};

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: EMPLOYEE_KEYS.mutations.update(),
        mutationFn: ({ id, employee }: { id: string; employee: UpdateEmployeeDto }) =>
            employeeService.updateEmployee(id, employee),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.detail(id) });
        },
    });
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: EMPLOYEE_KEYS.mutations.delete(),
        mutationFn: (id: string) => employeeService.deleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.lists() });
        },
    });
};
