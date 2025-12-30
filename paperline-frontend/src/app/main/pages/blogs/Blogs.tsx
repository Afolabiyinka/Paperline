import BlogCard from "../../components/BlogCard";
import LoadingContainer from "@/components/loader/loadingcontainer";
import { Button } from "@/components/ui/button";
import { Frown, Loader2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import type { BlogPost } from "../../types/types";
import Input from "@/components/ui/input";

const Blogs = () => {
  const { blogsLoading, blogError, blogs, refetch } = useBlogs();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4 md:p-8 gap-8 min-h-screen w-full">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
          Latest Blogs
        </h1>
        <Button
          size="lg"
          className="flex items-center gap-2"
          onClick={() => navigate("create")}
        >
          <Plus className="w-4 h-4" />
          Create a blog post
        </Button>
      </div>

      <span>
        <Input startIcon="Search" placeholder="Search blogs..." />
      </span>

      <div className="flex-1">
        {blogsLoading ? (
          <LoadingContainer />
        ) : blogError ? (
          <div className="flex flex-col justify-center items-center gap-6 h-full  w-full">
            <Frown size={120} className="stroke-[0.5px]" />
            <h1 className="text-2xl md:text-4xl">Something went wrong</h1>
            <Button
              variant="secondary"
              onClick={() => refetch}
              disabled={blogsLoading}
            >
              {blogsLoading && <Loader2 className="animate-spin mr-2" />}
              Try again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-2 md:p-4">
            {blogs.length === 0 ? (
              <div className="text-center text-lg text-gray-500 col-span-full">
                No blogs found
              </div>
            ) : (
              blogs.map((blog: BlogPost) => (
                <BlogCard blog={blog} key={blog.id} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
