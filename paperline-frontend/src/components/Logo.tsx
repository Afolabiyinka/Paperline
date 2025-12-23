import { Button } from "./ui/button";
import { Feather } from "lucide-react";

const Logo = () => {
  return (
    <a href="/" className="flex items-center gap-2  p-1.5  w-full">
      <Button className="rounded-full" size={`icon-lg`}>
        <Feather />
      </Button>
      <h1 className="font-bold tracking-widest text-xl">Paper line</h1>
    </a>
  );
};

export default Logo;
