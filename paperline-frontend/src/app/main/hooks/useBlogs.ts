import { useQuery } from "@tanstack/react-query";
import { getAllblogs } from "../services/request";

export default function useBlogs() {
  const {
    isLoading: blogsLoading,
    isFetching,
    error: blogError,
    data: blogs = [],
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllblogs,
    staleTime: 1000 * 60 * 5,
  });

  return { blogsLoading, isFetching, blogError, blogs, refetch };
}
