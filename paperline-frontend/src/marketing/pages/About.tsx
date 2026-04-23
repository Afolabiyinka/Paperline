import AboutImage from "@/assets/undraw_add-post_prex.svg";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:px-12 gap-12">

      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src={AboutImage}
          alt="About Illustration"
          className="w-full max-w-md lg:max-w-lg"
        />
      </motion.div>

      <motion.div
        className="flex-1 max-w-xl space-y-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >

        <h1 className="text-3xl md:text-4xl font-serif text-black">
          A space for writing and reading ideas
        </h1>

        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
          Paperline is a minimal blog platform for people who prefer clarity over noise.
        </p>

        {/* Soft CTA */}
        <div className="flex items-center gap-4 pt-2">

          <Input
            startIcon="Mail"
            type="email"
            placeholder="your email"
          // className="
          //   border-b border-neutral-300
          //   focus:border-neutral-500
          //   outline-none
          //   py-2
          //   text-sm
          //   w-full
          //   bg-transparent
          // "
          />

          <Button variant="ghost" className="text-sm">
            Join
          </Button>

        </div>

      </motion.div>

    </div>
  );
};

export default About;