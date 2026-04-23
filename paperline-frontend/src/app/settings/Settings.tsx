import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdateProfile from "./updateprofile";
import { AtSign, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useBlogs from "../blogs/hooks/useBlogs";
import { Link } from "react-router-dom";
import { useAuthStore } from "../auth/store/authStore";

const Settings = () => {
  const { authUser, logout } = useAuthStore();
  const { blogs } = useBlogs();



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

          <UpdateProfile />
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200" />

        {/* My Blogs */}
        <div className="space-y-4">

          <h2 className="text-sm text-neutral-500">
            Your posts
          </h2>

          <div className="space-y-2">

            {blogs?.length === 0 ? (
              <p className="text-sm text-neutral-400">
                No posts yet
              </p>
            ) : (
              blogs?.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.id}`}
                  className="block p-3 border border-neutral-100 hover:border-neutral-300 transition rounded-md"
                >
                  <p className="text-sm text-black">
                    {blog.title}
                  </p>

                  {blog.createdAt && (
                    <p className="text-xs text-neutral-400 mt-1">
                      {new Date(blog.createdAt).toDateString()}
                    </p>
                  )}
                </Link>
              ))
            )}

          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">

          <Button
            onClick={logout}
            variant="destructive"
            color=""
            className=""
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>

        </div>

      </div>
    </div>
  );
};

export default Settings;