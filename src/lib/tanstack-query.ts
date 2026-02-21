import { MutationCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    mutationCache: new MutationCache({

    }),
    defaultOptions: {

        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});