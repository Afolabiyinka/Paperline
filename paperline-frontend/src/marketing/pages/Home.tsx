import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import landingImg from "@/assets/undraw_blogging_38kl (1).svg";
import { Book, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full px-6 lg:px-16 gap-12">
      {/* LEFT */}
      <div className="w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-2xl space-y-6"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif font-normal tracking-tight"
          >
            Paperline
          </motion.h1>

          {/* Subheading */}
          <h2 className="text-xl md:text-2xl font-medium text-neutral-800">
            Where thoughts turn into stories.
          </h2>

          {/* Description */}
          <p className="text-neutral-600 text-lg leading-8 max-w-md">
            A calm space to read, write, and publish ideas — one paragraph at a time.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 flex-col sm:flex-row">
            <Button
              size="lg"
              // className="px-6"
              onClick={() => navigate("/blogs")}
            >
              <Book className="w-4 h-4" />
              Read
            </Button>

            <Button
              variant="ghost"
              size="lg"
              // className="px-6"
              onClick={() => navigate("blogs/create")}
            >
              Write
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="w-full flex items-center justify-center">
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={landingImg}
          className="w-full max-w-sm opacity-90"
          fetchPriority="high"
        />
      </div>
    </div>
  );
};

export default Home;
