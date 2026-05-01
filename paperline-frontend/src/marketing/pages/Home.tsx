import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import landingImg from "@/assets/undraw_blogging_38kl (1).svg";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Variants } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-120px)]">
          {/* LEFT: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center space-y-8 lg:space-y-10"
          >
            {/* Tagline */}
            <motion.div variants={itemVariants} className="inline-block">
              <span className="text-xs tracking-widest uppercase text-gray-500 dark:text-gray-400">
                Welcome to Paperline
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-tight text-black dark:text-white"
            >
              Where thoughts turn into stories.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl font-light"
            >
              A calm space to read, write, and publish ideas — one paragraph at a
              time. No algorithms, no distractions. Just you and your words.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 font-normal text-base px-8"
                onClick={() => navigate("/blogs")}
              >
                Start Reading
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-normal text-base px-8 group"
                onClick={() => navigate("/blogs/create")}
              >
                Write a story
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="pt-4">
              <div className="h-px bg-gray-200 dark:bg-gray-800 w-12" />
            </motion.div>

            {/* Stats/Social Proof */}
            <motion.div variants={itemVariants} className="flex gap-12 pt-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stories</p>
                <p className="text-2xl font-light text-black dark:text-white">10K+</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Writers</p>
                <p className="text-2xl font-light text-black dark:text-white">5K+</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Readers</p>
                <p className="text-2xl font-light text-black dark:text-white">50K+</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/40 dark:from-gray-900/40 to-transparent rounded-2xl blur-3xl" />
            <img
              src={landingImg}
              alt="Blogging illustration"
              className="relative w-full max-w-md opacity-80 dark:opacity-70"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest">
            Scroll
          </p>
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;