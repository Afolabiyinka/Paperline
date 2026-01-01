import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import BlogCoverUploader from "../../components/create-blog/imageuploader";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import { useCreateStore } from "@/app/store/createStore";
import useCreateBlog from "../../hooks/useCreateBlog";

const CreateBlog = () => {
  const { createBlog } = useCreateBlog();
  const { content, setContent, title, setTitle } = useCreateStore();

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen gap-4 p-4">
      {/* Cover Image */}
      <div className="w-full lg:w-1/2">
        <BlogCoverUploader />
      </div>

      {/* Editor Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl lg:text-4xl border-0 outline-none font-[open-sans]"
        />

        <div className="flex-1">
          <SimpleEditor content={content} onChange={(e) => setContent(e)} />
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-background pt-3 flex justify-end gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => console.log("Draft saved:")}
          >
            <FileText size={18} />
            Draft
          </Button>

          <Button className="flex items-center gap-2" onClick={createBlog}>
            Post
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
