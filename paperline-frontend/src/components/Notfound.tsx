import { ArrowLeft, Frown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen mx-auto flex flex-col items-center justify-center text-center px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center"
      >
        <Frown className="w-24 h-24 mx-auto stroke-[0.5px]" />
        <h1 className="mt-6 text-3xl font-bold leading-snug md:text-4xl">
          Page not Found!
        </h1>
        <h1 className="mt-4 mb-10 text-lg text-gray-500 md:max-w-md">
          Don&apos;t worry, our team is already on it. Please refresh the page
          or try again later.
        </h1>
        <span className="flex flex-col items-center justify-center">
          <Button onClick={() => navigate("/")} size={`lg`}>
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Button>{" "}
        </span>
      </motion.div>
    </div>
  );
}

export default Notfound;
