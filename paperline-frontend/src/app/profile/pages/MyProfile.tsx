import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AtSign, NotebookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";
import { useUserBlogs } from "../../settings/hooks/useUserBlogs";
import { useState } from "react";
import MyBlogActions from "../myBlogActions";
import SettingsTabs from "@/app/settings/SettingsTabs";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/lib/motion";
import BlogCard from "@/app/blogs/components/BlogCard";
import BlogCardSkeleton from "@/app/blogs/pages/blogs/sub-components/blog-card-skeloton";

const MyProfile = () => {
  const { authUser } = useAuthStore();
  const naviagate = useNavigate();

  const [page, setPage] = useState(1);
  const { error, isLoading, myBlogs, pagination } = useUserBlogs({
    page: page,
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6">
      <div className="space-y-10 w-full md:max-w-4xl">
        {/* Profile header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={authUser?.profilePic} />
              <AvatarFallback>
                {authUser?.username?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-lg font-serif font-normal text-black">
                {authUser?.username}
              </h1>

              <p className="flex items-center gap-1 text-sm text-neutral-500">
                <AtSign size={14} />
                {authUser?.email}
              </p>
            </div>
          </div>

          <SettingsTabs />
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200" />

        {/* My Blogs */}
        <div className="space-y-2 p-1">
          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid md:grid-cols-2 gap-10 overflow-y-scroll max-h-[60vh] p-1">
              {" "}
              {[...Array(3)].map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <BlogCardSkeleton />
                </motion.div>
              ))}
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <p className="text-sm text-red-500">Failed to load your posts</p>
          )}

          {/* Empty */}
          {!isLoading && !error && myBlogs.length === 0 && (
            <div className="flex md:max-h-screen md:h-full flex-col-reverse md:flex-row overflow-hidden justify-center items-center">
              <motion.div
                className="w-full flex flex-col justify-center items-start  gap-4 p-8 md:p-12"
                variants={containerVariants}
              >
                <NotebookText
                  className="text-secondary-foreground stroke-[1.25px]"
                  aria-hidden
                  size={32}
                />
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl font-semibold text-muted-foreground"
                >
                  Your blog is waiting
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="max-w-sm text-sm md:text-base text-muted-foreground"
                >
                  Looks a little quiet here. Write your first blog and start
                  sharing your ideas
                </motion.p>
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
                >
                  <Button onClick={() => naviagate(`/blogs/create`)}>
                    Write your first blog
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Data */}
          <div className="grid md:grid-cols-2 gap-10 overflow-y-scroll max-h-[60vh] p-1">
            {!isLoading &&
              !error &&
              myBlogs?.length > 0 &&
              myBlogs.map((blog) => (
                <div key={blog.id} className="shadow p-3">
                  <BlogCard blog={blog} />
                  <MyBlogActions blogId={blog.id} />
                </div>
              ))}
          </div>
        </div>
        {!isLoading && !error && myBlogs?.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>

            <p className="text-xs text-neutral-500">
              Page {pagination?.page} of {pagination?.totalPages}
            </p>

            <Button
              variant="outline"
              disabled={!pagination?.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
