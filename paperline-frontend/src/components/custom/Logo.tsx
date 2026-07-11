import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";

const Logo = () => {
  return (
    <a href="/" className="flex items-center  p-1.5  w-full">
      <Button className="rounded-full" size={`icon-lg`} variant={`link`}>
        <Feather />
      </Button>
      <h1 className="text-xl font-bold tracking-tight">Paperline</h1>
    </a>
  );
};

export default Logo;
