import { create } from "zustand";

interface CreateBlog {
  title: string;
  setTitle: (title: string) => void;

  content: string;
  setContent: (content: string) => void;

  imageUrl: string;
  setImageUrl: (image: string) => void;

  reset: () => void;
}

export const useCreateStore = create<CreateBlog>((set) => ({
  title: "",
  content: "",
  imageUrl: "",

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImageUrl: (imageUrl) => set({ imageUrl }),

  reset: () => set({ title: "", content: "", imageUrl: "" }),
}));
