import BlogCoverUploader from "../../components/create-blog/imageuploader";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import { useCreateStore } from "@/app/store/createStore";
import useCreateBlog from "../../hooks/useCreateBlog";
import TextEditor from "../../components/create-blog/TextEditor";

const CreateBlog = () => {
  const { createBlog } = useCreateBlog();
  const { title, setTitle } = useCreateStore();

  return (
    <div className="flex flex-col w-full  gap-4 p-4 justify-center items-center">
      <div className="md:w-[60%]">
        <BlogCoverUploader />
      </div>

      <div className="w-full md:w-[60%] flex flex-col p-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl lg:text-4xl border-0 outline-none tracking-widest font-[open-sans] p-2"
        />

        <TextEditor />

        <div className="flex gap-8 mt-4">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 flex items-center gap-2 justify-center"
            onClick={() => console.log("Draft saved")}
          >
            <FileText size={18} />
            Draft
          </Button>

          <Button
            size="lg"
            className="flex-1 flex items-center gap-2 justify-center"
            onClick={createBlog}
          >
            Post
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
