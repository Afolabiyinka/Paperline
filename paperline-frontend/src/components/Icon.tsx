import React from "react";
import * as LucideIcon from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface IconProps {
  icon: keyof typeof LucideIcon;
  tooltip?: string;
  onClick?: () => void;
  isSolid: boolean;
}

const Icon = ({ icon, tooltip, onClick, isSolid }: IconProps) => {
  const IconComponent = LucideIcon[icon] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  return (
    <Tooltip>
      <TooltipTrigger>
        <span onClick={onClick}>
          <motion.button
            onClick={onClick}
            whileHover={{ y: -4 }}
            transition={{ ease: "easeIn", duration: 0.8 }}
            whileTap={{ scale: 0.65 }}
            className={`${
              isSolid
                ? "bg-foreground text-white shadow"
                : "shadow backdrop-blur-3xl "
            } h-11 w-11 stroke-2 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer p-3`}
          >
            <IconComponent className="h-12 w-12" />
          </motion.button>{" "}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Icon;
