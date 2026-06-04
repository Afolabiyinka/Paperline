import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AtSign, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";
import { useUserBlogs } from "../../settings/hooks/useUserBlogs";
import { useState } from "react";
import MyBlogActions from "../myBlogActions";
import SettingsTabs from "@/app/settings/SettingsTabs";
import { useLogout } from "@/app/settings/hooks/useLogout";

const MyProfile = () => {
  const { authUser } = useAuthStore();

  const { logoutLoading, logoutMutate } = useLogout()
  const [page, setPage] = useState(1);
  const { error, isLoading, myBlogs, pagination } = useUserBlogs({ page: page })

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6">

      <div className="w-full max-w-lg space-y-10">

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
        <div className="space-y-2 overflow-y-scroll p-1">

          {/* Loading skeleton */}
          {isLoading && (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-3 border border-neutral-100 rounded-md animate-pulse"
                >
                  <div className="h-4 w-3/4 bg-neutral-200 rounded" />
                  <div className="h-3 w-1/3 bg-neutral-100 rounded mt-2" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <p className="text-sm text-red-500">
              Failed to load posts
            </p>
          )}

          {/* Empty */}
          {!isLoading && !error && myBlogs?.length === 0 && (
            <p className="text-sm text-neutral-400">
              No posts yet
            </p>
          )}

          {/* Data */}
          {!isLoading && !error && myBlogs?.length > 0 && (
            myBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-3 border-b border-border hover:border-neutral-300 transition flex items-center justify-between group"
              >
                <Link to={`/blogs/${blog.id}`} className="flex-1">
                  <div>
                    <p className="text-sm text-black">
                      {blog.title}
                    </p>

                    {blog.createdAt && (
                      <p className="text-xs text-neutral-400 mt-1">
                        {new Date(blog.createdAt).toDateString()}
                      </p>
                    )}
                  </div>
                </Link>

                <MyBlogActions blogId={blog.id} />
              </div>
            ))
          )}

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

        <div className="flex justify-end">

          <Button
            onClick={() => logoutMutate()}
            disabled={logoutLoading}
            variant="destructive"
          >
            {logoutLoading ? <Loader2 className="animate-spin" /> : (<>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </>)}
          </Button>

        </div>

      </div>
    </div>
  );
};

export default MyProfile;