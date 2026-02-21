import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { baseEmployeeSchema, type EmployeeFormValues } from "../schemas/employee-schema";
import type { Employee } from "../types/employee";

interface UseEmployeeFormOptions {
    defaultValues?: Partial<EmployeeFormValues>;
    employee?: Employee;
}

export const useEmployeeForm = ({ defaultValues, employee }: UseEmployeeFormOptions = {}) => {
    const form = useForm({
        resolver: zodResolver(baseEmployeeSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            jobTitle: "",
            department: "",
            gender: "male" as "male" | "female",
            dateOfBirth: "",
            registratonNumber: 0,
            ...defaultValues,
        },
    });

    useEffect(() => {
        if (employee) {
            form.reset({
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                jobTitle: employee.jobTitle,
                department: employee.department,
                gender: employee.gender as "male" | "female",
                dateOfBirth: employee.dateOfBirth.split("T")[0], // Ensure date format matches input[type="date"]
                registratonNumber: employee.registratonNumber,
            });
        }
    }, [employee, form]);

    return form;
};
