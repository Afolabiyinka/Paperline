import { useParams, useNavigate, Link } from "react-router-dom";
import useParticularBlog from "../../hooks/useParticularBlog";
import LoadingContainer from "@/components/loader/loadingcontainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Noblog from "./error/noblog";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return <Noblog />;

  const { particularBlog: blog, isLoading, error } = useParticularBlog(id);

  if (isLoading) return <LoadingContainer />;
  if (error || !blog) return <Noblog />;

  const formattedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  //Sanitizing the blog content

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <span className="w-full mb-3 p-3">
        <Button onClick={() => navigate(-1)} size={`lg`}>
          <ChevronLeft />
          Go Back
        </Button>
      </span>

      <article className="w-full max-w-3xl flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
          {blog.title}
        </h1>

        <span className="flex gap-3 items-center mb-10">
          <Avatar className="border h-10 w-10">
            <AvatarImage src={blog.author?.profilePic} />
            <AvatarFallback>{blog.author?.username?.[0]}</AvatarFallback>
          </Avatar>
          <Link
            className="font-medium text-gray-700 text-lg underline underline-offset-2"
            to={`/authors/${blog.author.id}`}
          >
            {blog.author?.username}
          </Link>
          <p>Posted on {formattedDate}</p>
        </span>

        <div className="w-full mb-12">
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-full rounded-2xl object-cover h-[420px] border"
          />
        </div>

        <div
          className="tracking-widest max-w-3xl text-gray-800 leading-relaxed text-left"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  );
};

export default BlogPage;
