import { useParams } from "react-router-dom";
import useParticularBlog from "../../hooks/useParticularBlog";
import type { BlogPost } from "../../types/types";
import LoadingContainer from "@/components/loader/loadingcontainer";
import Icon from "@/components/Icon";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Noblog from "./error/noblog";
const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { particularBlog, isLoading, error } = useParticularBlog(id);

  const blog: BlogPost = particularBlog;
  if (error) {
    return <Noblog />;
  }
  if (isLoading) {
    return <LoadingContainer />;
  }
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12 ">
      <span className="mb-3 w-full p-2" onClick={() => navigate(-1)}>
        <Icon icon="ChevronLeft" tooltip="Go back" isSolid />
      </span>
      <article className="w-full max-w-3xl flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
          {blog?.title}
        </h1>

        <span className="flex gap-3 items-center mb-10">
          <Avatar className="border h-10 w-10">
            <AvatarImage src={blog.author?.profilePic}></AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <p className="font-medium text-gray-700 text-lg">
            {blog.author?.username}
          </p>
        </span>

        <div className="w-full mb-12">
          <img
            src={blog?.coverImageUrl}
            alt={blog?.title}
            className="w-full rounded-2xl object-cover h-[420px] border "
          />
        </div>

        <div
          className="tracking-widest font-[montserrat]  max-w-none text-gray-800 leading-relaxed text-left"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </article>
    </div>
  );
};

export default BlogPage;
