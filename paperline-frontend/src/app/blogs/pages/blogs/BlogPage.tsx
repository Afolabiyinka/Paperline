import { useParams, useNavigate, Link } from "react-router-dom";
import useParticularBlog from "../../hooks/useParticularBlog";
import LoadingContainer from "@/components/loader/loadingcontainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Noblog from "./error/noblog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, MessageCircle } from "lucide-react";

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
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-3xl mx-auto mb-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-sm text-neutral-600 hover:text-black"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-black mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center justify-between mb-10 text-sm text-neutral-600">

          {/* Left: Author info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={blog.author?.profilePic} />
              <AvatarFallback>
                {blog.author?.username?.[0]}
              </AvatarFallback>
            </Avatar>

            <Link
              to={`/authors/${blog.author.id}`}
              className="hover:underline text-black"
            >
              {blog.author?.username}
            </Link>

            <span>·</span>
            <span>{formattedDate}</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 text-neutral-500">
            <div className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <Heart className="w-5 h-5" />
              <span className="text-xs">0</span>
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs">0</span>
            </div>
          </div>

        </div>


        <div className="mb-12">
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-full object-cover h-[420px]"
          />
        </div>

        <div
          className="
        prose 
        prose-neutral 
        prose-lg 
        max-w-none
      "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

    </div>
  );
};

export default BlogPage;
