import { Avatar } from "@/components/ui/avatar";
import type { BlogPost } from "../types/types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }: { blog: BlogPost }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="border w-full h-fit cursor-pointer hover:bg-black/80 overflow-hidden  rounded-lg hover:text-white transition-all duration-300"
      onClick={() => navigate(`/blogs/${blog.id}`)}
    >
      <img
        src={blog.coverImageUrl}
        alt={`${blog.title}`}
        className="h-72 w-full object-cover"
      />
      <div className="p-3">
        <h1 className="text-2xl font-semibold leading-snug truncate">
          {blog.title}
        </h1>
        <span className="flex items-center gap-2">
          <Avatar className="border h-10 w-10">
            <AvatarImage src={blog.author?.profilePic}></AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <p>{blog.author?.username}</p>
        </span>
      </div>
    </motion.div>
  );
};

export default BlogCard;
