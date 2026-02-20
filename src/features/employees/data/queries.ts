import { useQuery } from "@tanstack/react-query";
import { employeeService } from "../services/employee-service";
import { EMPLOYEE_KEYS } from "./keys";
import type { EmployeeFilters } from "../types/employee";

export const useEmployees = (filters: EmployeeFilters = {}) => {
    return useQuery({
        queryKey: EMPLOYEE_KEYS.list(filters),
        queryFn: () => employeeService.getEmployees(filters),
    });
};

export const useEmployee = (id: string) => {
    return useQuery({
        queryKey: EMPLOYEE_KEYS.detail(id),
        queryFn: () => employeeService.getEmployeeById(id),
        enabled: !!id,
    });
};
