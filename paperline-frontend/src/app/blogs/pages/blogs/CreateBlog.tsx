import BlogCoverUploader from "../../components/create-blog/imageuploader";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import { useCreateStore } from "@/app/blogs/store/createStore";
import useCreateBlog from "../../hooks/useCreateBlog";
import TextEditor from "../../components/create-blog/TextEditor";

const CreateBlog = () => {
  const { createBlog } = useCreateBlog();
  const { title, setTitle } = useCreateStore();

  return (
    <div
      className="min-h-screen w-full"
    >
      {/* Top bar */}
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b"
      >
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-medium tracking-tight"
          >
            Paperline
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
          >
            Draft
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log("Draft saved")}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900"
          >
            <FileText size={14} />
            Save draft
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={createBlog}
            className="flex items-center gap-1.5 text-xs font-medium rounded-full px-4"
            style={{ background: "#1a1a1a", color: "#faf9f7" }}
          >
            <Send size={13} />
            Publish
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-8">

        {/* Cover */}
        <BlogCoverUploader />

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full outline-none border-none bg-transparent placeholder:text-neutral-300"
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "#1a1a1a",
          }}
        />

        {/* Divider */}
        <div style={{ height: 1, background: "#e8e4de" }} />

        {/* Editor */}
        <div style={{ minHeight: 400 }}>
          <TextEditor />
        </div>

      </div>
    </div>
  );
};

export default CreateBlog;