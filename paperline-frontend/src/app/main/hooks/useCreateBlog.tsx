import { prodEndpoint } from "@/app/constants/api";
import { useAuthStore } from "@/app/store/authStore";
import { useCreateStore } from "@/app/store/createStore";
import useToastMessage from "@/lib/useToastmsg";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useCreateBlog() {
  const { toastError, toastSuccess, toastLoading } = useToastMessage();
  const { content, title, imageUrl, reset } = useCreateStore();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${prodEndpoint}/api/blogs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          content,
          coverImageUrl: imageUrl,
          authorId: authUser?.id || null,
        }),
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
      reset(); // clear store after posting
      navigate("/blogs");
    },

    onError: (err: any) => {
      toastError(err.message);
    },
  });

  const createBlog = () => {
    mutate();
  };

  return { createBlog };
}
