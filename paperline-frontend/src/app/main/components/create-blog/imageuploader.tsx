import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const BlogCoverUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    // Blog cover should be crisp but not crazy large
    if (file.size > 3 * 1024 * 1024) {
      alert("Image must be under 3MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="w-full h-full border border-dashed p-4 flex flex-col items-center gap-4 rounded-lg">
      {preview ? (
        <img
          src={preview}
          alt="Blog cover preview"
          className="w-full  object-cover rounded-md"
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

      <Button type="button" onClick={handleClick} className="w-full">
        {image ? "Change cover image" : "Upload cover image"}
      </Button>
    </div>
  );
};

export default BlogCoverUploader;
