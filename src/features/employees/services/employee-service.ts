import axios from "@/lib/axios";
import type { Employee, CreateEmployeeDto, UpdateEmployeeDto, EmployeeFilters } from "../types/employee";
import { AxiosError } from "axios";
export const employeeService = {
    getEmployees: async (filters: EmployeeFilters = {}) => {
        try {
            const { data } = await axios.get<Employee[]>("/employees", {
                params: filters,
            });
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 404) {
                    return [];
                }
            }
            throw error;
        }
    },

    getEmployeeById: async (id: string) => {
        const { data } = await axios.get<Employee>(`/employees/${id}`);
        return data;
    },

    createEmployee: async (employee: CreateEmployeeDto) => {
        const { data } = await axios.post<Employee>("/employees", employee);
        return data;
    },

    updateEmployee: async (id: string, employee: UpdateEmployeeDto) => {
        const { data } = await axios.put<Employee>(`/employees/${id}`, employee);
        return data;
    },

    deleteEmployee: async (id: string) => {
        const { data } = await axios.delete<Employee>(`/employees/${id}`);
        return data;
    },
};
