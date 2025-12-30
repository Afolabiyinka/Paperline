import { useQuery } from "@tanstack/react-query";
import { getParticularBlog } from "../services/request";

export default function useParticularBlog(id: number | string) {
  const {
    data: particularBlog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    enabled: !!id,
    queryFn: () => getParticularBlog(id),
  });
  return {
    particularBlog,
    isLoading,
    error,
  };
}
