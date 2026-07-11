import type { LucideProps } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

interface Props {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  tooltip?: string;
  linkTo: string;
}
const NavIcon = ({ icon: Icon, linkTo, tooltip }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = linkTo === location.pathname;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={`icon-lg`}
          variant={isActive ? "secondary" : "ghost"}
          onClick={() => navigate(linkTo)}
        >
          <Icon size={18} />
        </Button>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent className="bg-secondary text-black">
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default NavIcon;
