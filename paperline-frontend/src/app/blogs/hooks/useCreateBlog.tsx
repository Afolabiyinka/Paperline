import { useCreateStore } from "@/app/blogs/store/createStore";
import useToastMessage from "@/shared/lib/useToastmsg";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCloudinary } from "@/shared/hooks/useCloudinary";
import { apiClient } from "@/shared/api/apiClient";
import type { CreateBlogPayload } from "../types/blog.types";
import { queryClient } from "@/shared/constants/api";

export default function useCreateBlog() {
  const { toastError, toastSuccess, toastLoading } = useToastMessage();
  const { content, title, imageFile, reset } = useCreateStore();
  const navigate = useNavigate();
  const { uploadImage, uploading } = useCloudinary();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: CreateBlogPayload) => {
      try {
        const res = await apiClient.post(`blogs`, payload);
        return res.data;
      } catch (err) {
        throw new Error();
      }
    },

    onMutate: () => toastLoading("Creating blog…"),

    onSuccess: (data) => {
      toastSuccess(data.message || "Blog created successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      reset();
      navigate("/blogs");
    },

    onError: (err: Error) => toastError(err.message),
  });

  const createBlog = async () => {
    if (!imageFile) {
      toastError("Please add a cover image");
      return;
    }

    const coverImageUrl = await uploadImage(imageFile, "paperline/blog_images");
    const payload = { content, title, coverImageUrl };
    mutate(payload);
  };

  return { createBlog, imageUploading: uploading, creatingBlog: isPending };
}
