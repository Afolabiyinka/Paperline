import { useIsMobile } from "@/shared/hooks/useMobile";
import MobileNav from "./MobileNav";
import NavBar from "./NavBar";
const NavLayout = () => {
  const isMobile = useIsMobile(1027);
  return (
    <div className="h-full">
      <NavBar />

      {isMobile && <MobileNav />}
    </div>
  );
};

export default NavLayout;
