import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import landingImg from "@/assets/undraw_blogging_38kl (1).svg";
import { Book, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      // className="h-full flex flex-col lg:flex-row p-2 items-center"
      className="flex flex-col lg:flex-row items-center justify-center h-full min-h-screen w-full p-4 lg:p-8 gap-8"
    >
      {/* LEFT */}
      <div className="w-full h-full flex items-center px-4 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-2xl space-y-6 p-2"
        >
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-6xl font-bold"
          >
            Welcome to Paperline
          </motion.h1>
          <h1 className="text-4xl lg:text-4xl font-semibold leading-snug text-gray-800">
            Where thoughts turn into stories.
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed">
            Paperline is a calm space to read, write, and publish ideas — one
            paragraph at a time.
          </p>

          <div className="flex gap-4 pt-2">
            <Button size={`lg`} onClick={() => navigate("/blogs")}>
              <Book className="w-4 h-4" />
              Read blogs
            </Button>

            <Button variant={`outline`} size={`lg`}>
              Start writing
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="w-full h-full  lg:flex items-center justify-center p-3">
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={landingImg}
          // className="w-[600px] h-[520px] p-6"
          className="w-full max-w-md lg:max-w-md h-auto rounded-3xl p-4"
        />
      </div>
    </div>
  );
};

export default Home;
