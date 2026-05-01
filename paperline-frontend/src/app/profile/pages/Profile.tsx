import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AtSign, MessageCircle, UserPlus, UserCheck } from "lucide-react";
import { useState } from "react";
import useBlogs from "@/app/blogs/hooks/useBlogs";
import { useAuthStore } from "@/app/auth/store/authStore";
import { Link as RouterLink } from "react-router-dom";

const Profile = () => {
    const { authUser } = useAuthStore();
    const { blogs } = useBlogs();
    const [following, setFollowing] = useState(false);

    const stats = [
        { label: "Posts", value: blogs?.length ?? 0 },
        { label: "Followers", value: 340 },
        { label: "Following", value: 58 },
    ];

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

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <MessageCircle size={14} />
                            Message
                        </Button>
                        <Button
                            variant={following ? "secondary" : "outline"}
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => setFollowing((prev) => !prev)}
                        >
                            {following ? <UserCheck size={14} /> : <UserPlus size={14} />}
                            {following ? "Following" : "Follow"}
                        </Button>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-200" />

                {/* Bio */}
                <div className="space-y-3">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                        {"Full-stack developer & CS student. Building practical, monetizable products."}
                    </p>

                    {/* <div className="flex flex-wrap gap-3">
                        {authUser?.location && (
                            <span className="flex items-center gap-1 text-xs text-neutral-500">
                                <MapPin size={12} />
                                {authUser.location}
                            </span>
                        )}
                        {authUser?.website && (
                            <span className="flex items-center gap-1 text-xs text-neutral-500">
                                <Link size={12} />
                                {authUser.website}
                            </span>
                        )}
                    </div> */}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {stats.map(({ label, value }) => (
                        <div key={label} className="bg-neutral-50 rounded-md p-4">
                            <p className="text-xs text-neutral-500 mb-1">{label}</p>
                            <p className="text-2xl font-medium text-black">{value}</p>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-200" />

                {/* Posts */}
                <div className="space-y-4">
                    <h2 className="text-sm text-neutral-500">Recent posts</h2>

                    <div className="space-y-2">
                        {blogs?.length === 0 ? (
                            <p className="text-sm text-neutral-400">No posts yet</p>
                        ) : (
                            blogs?.map((blog) => (
                                <RouterLink
                                    key={blog.id}
                                    to={`/blogs/${blog.id}`}
                                    className="block p-3 border border-neutral-100 hover:border-neutral-300 transition rounded-md"
                                >
                                    <p className="text-sm text-black">{blog.title}</p>
                                    {blog.createdAt && (
                                        <p className="text-xs text-neutral-400 mt-1">
                                            {new Date(blog.createdAt).toDateString()}
                                        </p>
                                    )}
                                </RouterLink>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;