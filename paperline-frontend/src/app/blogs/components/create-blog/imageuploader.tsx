import { useEffect, useRef, useState } from "react";
import { useCreateStore } from "@/app/blogs/store/createStore";
import { ImageUp, UploadCloud, X } from "lucide-react";

const BlogCoverUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { setImageFile } = useCreateStore();

  // Revoke object URL on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setImageFile(file);
    e.target.value = "";
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setImageFile(null);
  };

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
              className="flex items-center gap-2 bg-white text-neutral-800 text-xs font-medium tracking-wide px-4 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <ImageUp className="w-3.5 h-3.5" />
              Change
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 bg-white text-neutral-800 text-xs font-medium tracking-wide px-4 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>

        </div>
      ) : (
        /* ── Empty state ── */
        <button
          type="button"
          onClick={handleClick}
          className="w-full h-72 flex flex-col items-center justify-center gap-3 border border-dashed border-neutral-200 hover:border-neutral-400 bg-neutral-50 hover:bg-white transition-all duration-300 group disabled:opacity-50 disabled:pointer-events-none"
        >
          <UploadCloud className="w-6 h-6 text-neutral-300 group-hover:text-neutral-500 transition-colors duration-300" />
          <div
            className="flex flex-col items-center gap-1"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <span className="text-xs font-medium text-neutral-500 group-hover:text-neutral-700 transition-colors">
              Add a cover image
            </span>
            <span className="text-xs text-neutral-400">
              JPEG, PNG or WebP · max 5 MB
            </span>
          </div>
        </button>
      )}
    </div>
  );
};

export default BlogCoverUploader;