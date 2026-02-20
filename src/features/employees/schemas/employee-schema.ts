import { z } from "zod";

export const baseEmployeeSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
    department: z.string().min(2, "Department must be at least 2 characters"),
    gender: z.enum(["male", "female"], {
        error: "Please select a gender",
    }),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)) && Date.parse(date) < Date.now(), {
        message: "Invalid date of birth",
    }),
    registratonNumber: z.coerce.number().positive("Registration number must be positive"),
});

export const createEmployeeSchema = baseEmployeeSchema;

export const updateEmployeeSchema = baseEmployeeSchema.partial();

export type EmployeeFormValues = z.infer<typeof baseEmployeeSchema>;
