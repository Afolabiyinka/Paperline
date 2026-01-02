import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import useToastMessage from "@/lib/useToastmsg";
import { useCloudinary } from "@/utils/cloudinary";
import { useCreateStore } from "@/app/store/createStore";

const BlogCoverUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { uploadImage, uploading } = useCloudinary();
  const { toastError } = useToastMessage();

  const { setImageUrl } = useCreateStore();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toastError("Only image files allowed");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toastError("Image must be under 3MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!image) return;

    const upload = async () => {
      const url = await uploadImage(image, "paperline/blog_covers");
      if (url) {
        setImageUrl(url);
      }
    };

    upload();

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [image]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      {preview ? (
        <img
          src={preview}
          alt="Blog cover preview"
          className="w-full object-cover rounded-md h-96"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center text-muted-foreground">
          No cover image selected
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <Button
        type="button"
        onClick={handleClick}
        className="w-full"
        disabled={uploading}
      >
        {uploading
          ? "Uploading..."
          : image
          ? "Change cover image"
          : "Upload cover image"}
      </Button>
    </div>
  );
};

export default BlogCoverUploader;
