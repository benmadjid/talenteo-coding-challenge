export interface Employee {
    id: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department: string;
    gender: "male" | "female";
    dateOfBirth: string;
    avatar: string;
    registratonNumber: number;
}

export type CreateEmployeeDto = Omit<Employee, "id" | "createdAt">;

export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

export interface EmployeeFilters {
    page?: number;
    limit?: number;
    search?: string;
}
