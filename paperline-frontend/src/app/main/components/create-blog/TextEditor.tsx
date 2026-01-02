import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCreateStore } from "@/app/store/createStore";

const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const { setContent } = useCreateStore();

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start writing here...",
        modules: {
          toolbar: "#toolbar",
        },
      });

      quillRef.current.on("text-change", () => {
        setContent(quillRef.current!.root.innerHTML);
      });
    }
  }, []);

  return (
    <div className="font-[open-sans]">
      {/* Blog toolbar */}
      <div id="toolbar" className="border-0" style={{ border: "none" }}>
        {/* Basic text formatting */}
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />

        {/* Headings */}
        <select className="ql-header" defaultValue="">
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="">Normal</option>
        </select>

        {/* Lists */}
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />

        {/* Links & images */}
        <button className="ql-link" />
        <button className="ql-image" />

        {/* Code / blockquote */}
        <button className="ql-code-block" />
        <button className="ql-blockquote" />

        {/* Text color & background */}
        <select className="ql-color" />
        <select className="ql-background" />

        {/* Alignment */}
        <select className="ql-align" />

        {/* Clean formatting */}
        <button className="ql-clean" />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        className="ql-container border-0 shadow-none "
        style={{
          height: "400px",
          backgroundColor: "#fff",
          border: "none",
          fontSize: "1.2rem",
          fontFamily: "Open sans",
        }}
      ></div>
    </div>
  );
};

export default TextEditor;
