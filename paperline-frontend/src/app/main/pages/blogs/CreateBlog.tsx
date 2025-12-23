import { useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import BlogCoverUploader from "../../components/create-blog/imageuploader";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import useCreateBlog from "../../hooks/useCreateBlog";

const CreateBlog = () => {
  const { blogData, setBlogData, createBlog } = useCreateBlog();

  return (
    <div className="p-4 flex flex-col lg:flex-row w-screen h-screen gap-4">
      {/* Left: Cover Image */}
      <div className="lg:w-1/2  w-full h-full">
        <BlogCoverUploader />
      </div>

      <div className="lg:w-1/2 w-full h-full flex flex-col gap-4 p-2 overflow-y-auto">
        <input
          type="text"
          placeholder="Title"
          value={blogData.title}
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          className="w-full text-4xl border-0 outline-0 font-[open-sans]"
        />

        {/* Blog Editor */}
        <SimpleEditor
          content={blogData.content}
          onChange={(html) => setBlogData({ ...blogData, content: html })}
        />

        {/* Action Buttons */}
        <div className="w-full flex justify-end gap-3 pt-2">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => console.log("Draft saved:", blogData)}
          >
            <FileText size={18} />
            Save to drafts
          </Button>

          <Button className="flex items-center gap-2" onClick={createBlog}>
            Post blog
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
