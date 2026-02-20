export const EMPLOYEE_KEYS = {
    all: ["employees"] as const,
    lists: () => [...EMPLOYEE_KEYS.all, "list"] as const,
    list: (filters: Record<string, any>) => [...EMPLOYEE_KEYS.lists(), filters] as const,
    details: () => [...EMPLOYEE_KEYS.all, "detail"] as const,
    detail: (id: string) => [...EMPLOYEE_KEYS.details(), id] as const,
    mutations: {
        create: () => [...EMPLOYEE_KEYS.all, "create"] as const,
        update: () => [...EMPLOYEE_KEYS.all, "update"] as const,
        delete: () => [...EMPLOYEE_KEYS.all, "delete"] as const,
    },
};