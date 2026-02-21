import { Skeleton } from "@/components/ui/skeleton";

function FormFieldSkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export function EmployeeFormSkeleton() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormFieldSkeleton />
                <FormFieldSkeleton />
            </div>

            <FormFieldSkeleton />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormFieldSkeleton />
                <FormFieldSkeleton />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormFieldSkeleton />
                <FormFieldSkeleton />
            </div>

            <FormFieldSkeleton />

            <div className="flex justify-end gap-2 pt-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-36" />
            </div>
        </div>
    );
}
