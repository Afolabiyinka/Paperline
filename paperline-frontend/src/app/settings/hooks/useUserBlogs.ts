import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUserBlogs } from "../services/user";

export const useUserBlogs = ({ page }: { page: number }) => {
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ["my-blogs", page],
        queryFn: () => getUserBlogs(page),
        placeholderData: keepPreviousData,
    });

    return {
        myBlogs: data?.blogs ?? [],
        pagination: data?.pagination,
        isLoading,
        isFetching,
        error,
    };
};