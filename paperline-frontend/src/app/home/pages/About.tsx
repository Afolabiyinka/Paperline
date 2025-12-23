import AboutImage from "@/assets/undraw_add-post_prex.svg";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@base-ui/react";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-full min-h-screen p-4 lg:p-8 gap-8">
      {/* Image Section */}
      <motion.div
        className="flex justify-center lg:flex-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src={AboutImage}
          alt="About Illustration"
          className="w-full max-w-md lg:max-w-lg h-auto rounded-3xl p-4"
        />
      </motion.div>

      {/* Text & Form Section */}
      <motion.div
        className="flex flex-col lg:flex-1 max-w-2xl w-full gap-6 px-2 lg:px-8 text-left"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          initial={{ y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Where ideas turn to stories
        </motion.h1>

        <p className="text-xl sm:text-2xl lg:text-4xl">
          Sign up for amazing content & newsletters
        </p>

        <motion.form
          className="flex flex-col sm:flex-row gap-2 items-center border p-2 rounded-lg w-full"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Input
            type="email"
            name="email"
            aria-label="Email"
            placeholder="Enter your email"
            className="h-12 w-full sm:flex-1 p-2 focus:outline-0 border-0"
          />
          <Button type="submit" className="h-12  w-full sm:w-auto">
            Involve me
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default About;
