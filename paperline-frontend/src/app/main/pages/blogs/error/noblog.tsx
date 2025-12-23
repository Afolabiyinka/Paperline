import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Noblog = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-center gap-4 p-4">
      <div>
        <Logo />
      </div>
      <h1 className="text-9xl font-bold mt-3">404</h1>
      <p className="text-2xl mb-3">Oop's blog not found!!</p>

      <Button onClick={() => navigate(-1)}>Go back</Button>
    </div>
  );
};

export default Noblog;
