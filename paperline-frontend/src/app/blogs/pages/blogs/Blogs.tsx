import BlogCard from "../../components/BlogCard";
import { Button } from "@/components/ui/button";
import { Frown, Loader2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import type { BlogPost } from "../../types/types";
import Input from "@/components/ui/input";
import BlogCardSkeleton from "./sub-components/blog-card-skeloton";

const Blogs = () => {
  const { blogsLoading, blogError, blogs, refetch } = useBlogs();

  return (
    <div className="min-h-screen w-full px-6 md:px-12 py-10">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-normal text-black">
          Latest stories
        </h1>

        <Link to="create">
          <Button variant="ghost" className="text-sm">
            <Plus className="w-4 h-4 mr-1" />
            Write
          </Button>
        </Link>
      </div>

      <div className="max-w-md mb-12">
        <Input startIcon="Search" placeholder="Search stories..." />
      </div>

      {blogsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : blogError ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-neutral-500">
          <Frown size={60} className="stroke-[1px]" />
          <p>Something went wrong</p>

          <Button
            variant="ghost"
            onClick={() => refetch()}
            className="text-sm"
          >
            <Loader2 className="animate-spin mr-2 w-4 h-4" />
            Try again
          </Button>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-neutral-500 py-20">
          No stories yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog: BlogPost) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;