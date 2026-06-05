import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchBlogs } from "../api/search";
import { useDebounce } from "@/shared/hooks/useDebounce";

export const useSearch = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const query = useMemo(() => {
        return new URLSearchParams(location.search).get("q") || "";
    }, [location.search]);

    // local input state (for instant typing UX)
    const setQuery = (value: string) => {
        navigate(`/search?q=${encodeURIComponent(value)}`);
    };

    const debouncedQuery = useDebounce(query, 700);

    const {
        data: searchresults,
        error: searchError,
        isLoading: searchLoading,
    } = useQuery({
        queryKey: ["search-results", debouncedQuery],
        queryFn: () => searchBlogs(debouncedQuery),
        enabled: !!debouncedQuery.trim(),
        retry: false,
        refetchOnWindowFocus: false,
    });
    return {
        searchLoading,
        searchresults,
        searchError,
        query,
        setQuery,
    };
};