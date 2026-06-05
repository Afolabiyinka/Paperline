import useToastMessage from "@/shared/lib/useToastmsg";
import { useMutation } from "@tanstack/react-query";
import { deleteBlog } from "../services/blogs";
import { queryClient } from "@/shared/constants/api";

export const useDeleteBlog = (id: string) => {
    const { toastError, toastSuccess, toastLoading } = useToastMessage();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteBlog(id),
        onMutate: () => toastLoading("Deleting blog…"),
        onSuccess: () => {
            toastSuccess("Blog deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (err) => toastError(err.message),
    })

    function handleDelete() {
        mutate(id);
    }
    return { handleDelete, loading: isPending };
}