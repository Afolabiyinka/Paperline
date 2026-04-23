import { getUser } from "@/app/settings/services/user";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
    const { data, isLoading, isFetched, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false,
    });

    return {
        fetchedUser: data?.user,
        isLoading,
        isFetched,
        error,
    };
};
