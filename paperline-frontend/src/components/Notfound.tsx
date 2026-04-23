import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-6"
      >

        {/* Icon */}
        <div className="text-neutral-400">
          <span className="text-6xl">404</span>
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-serif text-black">
          Page not found
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
          This page doesn’t exist or may have been moved.
        </p>

        {/* Action */}
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="text-sm text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back home
        </Button>

      </motion.div>

    </div>
  );
}

export default Notfound;