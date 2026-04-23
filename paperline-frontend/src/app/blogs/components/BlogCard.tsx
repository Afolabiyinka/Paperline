import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { BlogPost } from "../types/types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }: { blog: BlogPost }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/blogs/${blog.id}`)}
      className="cursor-pointer group"
    >
      <div className="overflow-hidden">
        <img
          src={blog.coverImageUrl}
          alt={blog.title}
          className="h-60 w-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
        />
      </div>

      <div className="py-4 space-y-3">
        <h1 className="text-xl md:text-2xl font-serif font-normal text-black group-hover:underline underline-offset-4 transition">
          {blog.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Avatar className="h-7 w-7">
            <AvatarImage src={blog.author?.profilePic} />
            <AvatarFallback>
              {blog.author?.username?.[0]}
            </AvatarFallback>
          </Avatar>

          <p className="text-black">{blog.author?.username}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;