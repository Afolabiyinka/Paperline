import { motion } from "framer-motion";

const BlogCardSkeleton = () => {
    return (
        <motion.div
            className="w-full overflow-hidden"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
            {/* Image skeleton */}
            <div className="h-60 w-full bg-neutral-200" />

            {/* Content */}
            <div className="py-4 space-y-3">
                {/* Title */}
                <div className="h-5 w-3/4 bg-neutral-200" />
                <div className="h-5 w-1/2 bg-neutral-200" />

                {/* Author */}
                <div className="flex items-center gap-2 mt-4">
                    <div className="h-7 w-7 rounded-full bg-neutral-200" />
                    <div className="h-3 w-24 bg-neutral-200" />
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCardSkeleton;