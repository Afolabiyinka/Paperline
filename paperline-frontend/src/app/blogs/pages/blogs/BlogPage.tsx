import { useParams, useNavigate, Link } from "react-router-dom";
import useParticularBlog from "../../hooks/useParticularBlog";
import LoadingContainer from "@/components/loader/loadingcontainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Noblog from "./error/noblog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, MessageCircle } from "lucide-react";
import DOMPurify from "dompurify";
import { useEffect } from "react";



const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { particularBlog: blog, isLoading, error } = useParticularBlog(id ?? "");

  useEffect(() => {
    if (blog?.title) document.title = blog.title;
  }, [blog?.title]);

  if (!id) return <Noblog />;
  if (isLoading) return <LoadingContainer />;
  if (error || !blog || !blog.author) return <Noblog />;


  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : null;

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-3xl mx-auto mb-8">
        <Button
          onClick={() => navigate(-1)}
          variant="secondary"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-black mb-6">
          {blog.title}
        </h1>
        <div className="flex md:items-center gap-4 justify-between mb-10 text-sm text-neutral-600 flex-col md:flex-row">

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
    prose prose-neutral prose-lg max-w-none
     prose-headings:tracking-tight prose-headings:text-black
    prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
    prose-p:leading-8 prose-p:text-neutral-800
    prose-a:text-black prose-a:underline hover:prose-a:text-neutral-600
    prose-strong:text-black prose-strong:font-semibold
    prose-blockquote:border-l-black prose-blockquote:text-neutral-600 prose-blockquote:not-italic
    prose-code:text-black prose-code:bg-neutral-100 prose-code:px-1 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
    prose-pre:bg-neutral-950 prose-pre:text-neutral-100 prose-pre:rounded-none
    prose-ul:list-disc prose-ol:list-decimal
    prose-li:text-neutral-800 prose-li:leading-7
    prose-img:w-full prose-img:rounded-none
    prose-hr:border-neutral-200
  "
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>

    </div>
  );
};

export default BlogPage;
