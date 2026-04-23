import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Noblog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 space-y-6">



      {/* Code */}
      <h1 className="text-4xl font-serif text-black">
        404
      </h1>

      {/* Message */}
      <p className="text-sm text-neutral-500 max-w-sm">
        This blog doesn’t exist or may have been removed.
      </p>

      {/* Action */}
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="text-sm"
      >
        Go back
      </Button>

    </div>
  );
};

export default Noblog;