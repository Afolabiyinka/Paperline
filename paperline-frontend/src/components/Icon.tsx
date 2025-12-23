import { icons } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type IconName = keyof typeof icons;

interface IconProps {
  icon: IconName;
  tooltip?: string;
  onClick?: () => void;
  isSolid?: boolean;
}

const Icon = ({ icon, tooltip, onClick, isSolid = false }: IconProps) => {
  const IconComponent = icons[icon];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          onClick={onClick}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.85 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className={`h-11 w-11 rounded-full flex items-center justify-center cursor-pointer transition-all
            ${isSolid ? "bg-foreground text-background shadow" : "shadow"}`}
        >
          <IconComponent className="h-5 w-5" />
        </motion.button>
      </TooltipTrigger>

      {tooltip && (
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default Icon;
