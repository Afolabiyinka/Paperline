import { useEffect, useRef, useState } from "react";
import useToastMessage from "@/shared/lib/useToastmsg";
import { useCloudinary } from "@/shared/utils/cloudinary";
import { useCreateStore } from "@/app/blogs/store/createStore";
import { ImageUp, UploadCloud } from "lucide-react";

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
      if (url) setImageUrl(url);
    };

    upload();

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [image]);

  return (
    <div className="w-full space-y-4">

      {/* Preview */}
      <div className="w-full h-64 border border-neutral-200 flex items-center justify-center overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-sm text-neutral-400">
            No cover image
          </p>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* Action */}
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="text-sm text-neutral-600 hover:text-black transition flex items-center gap-2"
      >
        {uploading ? (
          "Uploading..."
        ) : image ? (
          <>
            <ImageUp className="w-4 h-4" />
            Change cover
          </>
        ) : (
          <>
            <UploadCloud className="w-4 h-4" />
            Add cover image
          </>
        )}
      </button>

    </div>
  );
};

export default BlogCoverUploader;