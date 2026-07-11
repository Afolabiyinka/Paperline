import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

const CustomError = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 text-center space-y-6"
      >
        <div className="flex justify-center">
          <div className="p-4 rounded-full  text-destructive">
            <AlertTriangle />
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground mt-2">
            We couldn’t complete your request.
          </p>
        </div>

        {error && (
          <div className="text-xs text-muted-foreground bg-muted/50 border rounded-full p-3 wrap-break-word">
            {error.message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3  items-center justify-center">
          <Button onClick={() => window.location.reload()} size={`lg`}>
            Try again
          </Button>

          <Button size={`lg`} variant="outline" onClick={() => navigate("/")}>
            {/* <Home /> */}
            Go home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomError;
