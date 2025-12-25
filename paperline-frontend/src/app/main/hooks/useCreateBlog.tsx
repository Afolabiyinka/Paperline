import useToastMessage from "@/lib/useToastmsg";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCreateBlog() {
  const { toastError, toastSuccess, toastLoading } = useToastMessage();
  const baseUrl = import.meta.env.VITE_BASEURL!;

  // Get user from localStorage safely
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    authorId: parsedUser?.id || null,
    coverImageUrl: "",
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${baseUrl}
/api/blogs/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        }
      );
      const data = await res.json();

      return data;
    },
    onSuccess: () => {
      toastSuccess("Blog created succesfully");
      navigate("/blogs");
    },
    onError: (err) => {
      toastError(err.message);
    },
    onMutate: () => toastLoading("Creating blog"),
  });

  function createBlog() {
    mutate();
    console.log(blogData);
  }
  return { createBlog, setBlogData, blogData };
}
