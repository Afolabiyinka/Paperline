import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Notfound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-screen w-screen flex flex-col gap-6 justify-center items-center p-3"
    >
      <h1 className="text-5xl font-bold">404</h1>
      <h1 className="text-5xl font-bold text-gray-800">Not found!</h1>
      <p className="flex items-center gap-3 font-semibold md:text-xl tracking-wide truncate">
        The link <p className="border p-1.5 rounded-lg">{location.pathname}</p>
        is broken or does'nt exist
      </p>
      <Button onClick={() => navigate("/")} size={`lg`} variant={`secondary`}>
        <ArrowLeft className="w-4 h-4" />
        Go back
      </Button>
    </motion.div>
  );
};

export default Notfound;
