// src/hooks/useCloudinary.ts
import { useState } from "react";
import useToastMessage from "@/lib/useToastmsg";

export const useCloudinary = () => {
  const { toastError, toastSuccess } = useToastMessage();
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = import.meta.env.VITE_CLD_CLOUDNAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLD_UPLOAD_PRESET;

  const uploadImage = async (
    file: File,
    folder: string = "uploads"
  ): Promise<string | null> => {
    if (!file) return null;

    if (!file.type.startsWith("image/")) {
      toastError("Please select an image file");
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      toastError("File size must be less than 5MB");
      return null;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folder);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      toastSuccess("Image uploaded successfully!");
      return data.secure_url as string;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toastError("Failed to upload image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
