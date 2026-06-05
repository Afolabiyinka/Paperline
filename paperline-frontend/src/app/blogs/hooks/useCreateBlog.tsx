import { prodEndpoint } from "@/shared/constants/api";
import { useCreateStore } from "@/app/blogs/store/createStore";
import useToastMessage from "@/shared/lib/useToastmsg";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCloudinary } from "@/shared/utils/cloudinary";

export default function useCreateBlog() {
  const { toastError, toastSuccess, toastLoading } = useToastMessage();
  const { content, title, imageFile, reset } = useCreateStore();
  const navigate = useNavigate();
  const { uploadImage, uploading } = useCloudinary();

  const { mutate, isPending } = useMutation({
    mutationFn: async (coverImageUrl: string | null) => {
      const res = await fetch(`${prodEndpoint}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, coverImageUrl }),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create blog");
      }

      return res.json();
    },

    onMutate: () => toastLoading("Creating blog…"),

    onSuccess: (data) => {
      toastSuccess(data.message || "Blog created successfully");
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
    mutate(coverImageUrl);
  };

  return { createBlog, imageUploading: uploading, creatingBlog: isPending };
}