import type { ReactNode } from "react";
import { QueryClientProvider } from "./QueryClientProvider";
import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const AppProviders = ({ children }: { children?: ReactNode }) => {
    return <QueryClientProvider >
        <Toaster position="top-right" richColors closeButton />
        <RouterProvider router={router} ></RouterProvider>
        {children}
    </QueryClientProvider>
}
export default AppProviders