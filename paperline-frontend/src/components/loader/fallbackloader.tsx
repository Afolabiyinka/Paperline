import { motion } from "framer-motion";
import Loader from "./loader";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// const letter = {
//   hidden: {
//     x: -20,
//     opacity: 0,
//   },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       ease: "easeInOut",
//       duration: 0.8,
//     },
//   },
// };

const Fallback = () => {
  const words = "PAPERLINE".split("");

  return (
    <div className="h-screen w-screen flex justify-center gap-10 items-center">
      <motion.p
        className="flex gap-4 text-3xl font-bold"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((letterChar, i) => (
          <motion.span key={i}>{letterChar}</motion.span>
        ))}
      </motion.p>
      <Loader />
    </div>
  );
};

export default Fallback;
