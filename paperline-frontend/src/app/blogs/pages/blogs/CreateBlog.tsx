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
    <div className="min-h-screen w-full flex flex-col lg:flex-row">

      {/* Cover */}
      <div className="lg:w-1/3 p-6 border-r border-neutral-100">
        <BlogCoverUploader />
      </div>

      {/* Writing area */}
      <div className="flex-1 flex flex-col px-6 py-10 max-w-3xl mx-auto w-full">

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            text-4xl md:text-5xl
            font-serif
            font-normal
            outline-none
            border-none
            mb-6
            text-black
          "
        />

        {/* Editor */}
        <TextEditor />

        {/* Actions */}
        <div className="flex gap-4 mt-10">
          <Button
            variant="ghost"
            className="flex-1 flex items-center gap-2 justify-center"
            onClick={() => console.log("Draft saved")}
          >
            <FileText size={18} />
            Draft
          </Button>

          <Button
            className="flex-1 flex items-center gap-2 justify-center"
            onClick={createBlog}
          >
            <Send size={18} />
            Publish
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CreateBlog;