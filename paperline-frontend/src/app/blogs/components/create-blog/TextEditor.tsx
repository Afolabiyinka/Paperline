import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCreateStore } from "@/app/blogs/store/createStore";

const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const { setContent } = useCreateStore();

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your story...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        setContent(quillRef.current!.root.innerHTML);
      });
    }
  }, []);

  return (
    <div className="font-serif">
      {/* Toolbar override */}
      <div id="toolbar" className="border-b border-neutral-200 pb-2 mb-4" />

      {/* Editor */}
      <div
        ref={editorRef}
        className="ql-container border-0 shadow-none"
        style={{
          minHeight: "420px",
          backgroundColor: "#fff",
          fontSize: "18px",
          lineHeight: "1.8",
          fontFamily: "Merriweather, serif",
          color: "#111",
        }}
      />
    </div>
  );
};

export default TextEditor;