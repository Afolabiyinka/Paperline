import { useEffect, useRef, useState } from "react";
import useToastMessage from "@/shared/lib/useToastmsg";
import { useCloudinary } from "@/shared/utils/cloudinary";
import { useCreateStore } from "@/app/blogs/store/createStore";
import { ImageUp, UploadCloud, X } from "lucide-react";

const BlogCoverUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { uploadImage, uploading } = useCloudinary();
  const { toastError } = useToastMessage();
  const { setImageUrl } = useCreateStore();

  const handleClick = () => inputRef.current?.click();

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

    setPreview(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setImage(file);
    e.target.value = "";
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setImage(null);
    setImageUrl("");
  };

  useEffect(() => {
    if (!image) return;
    const upload = async () => {
      const url = await uploadImage(image, "paperline/blog_covers");
      if (url) setImageUrl(url);
    };
    upload();
  }, [image, uploadImage, setImageUrl]);

  return (
    <div className="w-full">

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        /* ── Filled state ── */
        <div className="group relative w-full h-72 overflow-hidden">
          <img
            src={preview}
            alt="cover"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Actions — appear on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              onClick={handleClick}
              disabled={uploading}
              className="flex items-center gap-2 bg-white text-neutral-800 text-xs font-medium tracking-wide px-4 py-2 hover:bg-neutral-100 transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <ImageUp className="w-3.5 h-3.5" />
              {uploading ? "Uploading…" : "Change"}
            </button>

            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="flex items-center gap-2 bg-white text-neutral-800 text-xs font-medium tracking-wide px-4 py-2 hover:bg-neutral-100 transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>

          {/* Uploading bar */}
          {uploading && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-200">
              <div className="h-full bg-neutral-800 animate-pulse w-2/3" />
            </div>
          )}
        </div>

      ) : (
        /* ── Empty state ── */
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="w-full h-72 flex flex-col items-center justify-center gap-3 border border-dashed border-neutral-200 hover:border-neutral-400 bg-neutral-50 hover:bg-white transition-all duration-300 group"
        >
          <UploadCloud
            className="w-6 h-6 text-neutral-300 group-hover:text-neutral-500 transition-colors duration-300"
          />
          <div
            className="flex flex-col items-center gap-1"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <span className="text-xs font-medium text-neutral-500 group-hover:text-neutral-700 transition-colors">
              Add a cover image
            </span>
            <span className="text-xs text-neutral-400">
              JPEG, PNG or WebP · max 3 MB
            </span>
          </div>
        </button>

      )}

    </div>
  );
};

export default BlogCoverUploader;