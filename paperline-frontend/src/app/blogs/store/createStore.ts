import { create } from "zustand";

interface CreateBlog {
  title: string;
  setTitle: (title: string) => void;

  content: string;
  setContent: (content: string) => void;

  imageUrl: string;
  setImageUrl: (image: string) => void;

  imageFile: File | null;
  setImageFile: (file: File | null) => void;

  reset: () => void;
}

export const useCreateStore = create<CreateBlog>((set) => ({
  title: "",
  content: "",
  imageUrl: "",

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  imageFile: null,
  setImageFile: (file) => set({ imageFile: file }),

  reset: () => set({ title: "", content: "", imageUrl: "" }),
}));
