import { useQuery } from "@tanstack/react-query";
import { getAllblogs } from "../services/request";
export default function useBlogs() {
  const {
    isLoading: blogsLoading,
    error: blogError,
    data: blogs,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllblogs(),
  });

  return { blogsLoading, blogError, blogs, refetch };
}
