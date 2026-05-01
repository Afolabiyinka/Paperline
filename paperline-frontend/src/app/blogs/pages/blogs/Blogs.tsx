import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "../../components/BlogCard";
import { Button } from "@/components/ui/button";
import { Frown, Loader2, Plus, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import type { BlogPost } from "../../types/types";
import Input from "@/components/ui/input";
import BlogCardSkeleton from "./sub-components/blog-card-skeloton";

const Blogs = () => {
  const { blogsLoading, blogError, blogs, refetch } = useBlogs();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter((blog: BlogPost) =>
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between md:items-start gap-8 mb-12"
        >
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-serif font-normal text-black dark:text-white leading-tight mb-2">
              Latest stories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Discover and explore stories from our community
            </p>
          </div>

          <Link to="create" className="flex-shrink-0">
            <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 font-normal text-sm px-6">
              <Plus className="w-4 h-4 mr-2" />
              Write a story
            </Button>
          </Link>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Content Section */}
        {blogsLoading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                <BlogCardSkeleton />
              </motion.div>
            ))}
          </motion.div>
        ) : blogError ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-6 py-20"
          >
            <div className="rounded-full bg-gray-100 dark:bg-gray-900 p-6">
              <Frown size={48} className="stroke-1 text-gray-400 dark:text-gray-600" />
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Something went wrong
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                We couldn't load the stories. Please try again.
              </p>
            </div>

            <Button
              onClick={() => refetch()}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 font-normal text-sm px-6"
            >
              <Loader2 className="animate-spin mr-2 w-4 h-4" />
              Try again
            </Button>
          </motion.div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              {searchQuery ? "No stories found" : "No stories yet"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Be the first to write a story"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredBlogs.map((blog: BlogPost) => (
              <motion.div key={blog.id} variants={itemVariants}>
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blogs;