import { QueryClientProvider as QCProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { queryClient } from "@/lib/tanstack-query"
export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
    return (
        <QCProvider client={queryClient}>
            {children}
        </QCProvider>
    )
}