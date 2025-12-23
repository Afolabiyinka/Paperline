import { NavLink } from "react-router-dom";
import { NAVLINKS } from "../libs/navrelated";
import Logo from "@/components/Logo";
import { useIsMobile } from "@/hooks/useMobile";
import Signupmobile from "@/app/auth/pages/mobile/signupmobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Loginmobile from "@/app/auth/pages/mobile/loginmobile";
import useUser from "@/app/main/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/Icon";

const NavBar = () => {
  const isMobile = useIsMobile(1024);
  const [open, setOpen] = useState(false);
  const { authUser } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="p-1 px-6 w-full border flex flex-col lg:flex-row justify-between items-center">
      <div className="w-full flex items-center justify-around lg:justify-start">
        <Logo />
        {isMobile && (
          <span onClick={() => setOpen(!open)}>
            {open ? <X /> : <AlignRight />}
          </span>
        )}
      </div>
      <AnimatePresence>
        {(open || !isMobile) && (
          <motion.div
            initial={{ opacity: 0.8, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              stiffness: 260,
              damping: 22,
              duration: 0.5,
            }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-3 gap-2 w-full"
          >
            {/* Nav Links */}
            <span className="flex flex-col lg:flex-row lg:gap-10 gap-4 w-full">
              {NAVLINKS.map((link, i) => (
                <motion.span key={i}>
                  <NavLink
                    onClick={() => setOpen(!open)}
                    key={link.path}
                    className={({ isActive }) =>
                      isActive ? "underline underline-offset-4" : ""
                    }
                    to={link.path}
                  >
                    {link.name}
                  </NavLink>
                </motion.span>
              ))}
            </span>

            <span className="w-full flex gap-3 items-center">
              {authUser ? (
                <Avatar
                  onClick={() => navigate("/settings")}
                  className="cursor-pointer size-12"
                >
                  <AvatarImage src={authUser.profilePic} />
                  <AvatarFallback>
                    {authUser.username.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="hidden lg:block">
                  <span className="flex gap-3 p-1">
                    <Button
                      variant="link"
                      onClick={() => navigate("/auth/login")}
                    >
                      Log in
                    </Button>

                    <Button onClick={() => navigate("/auth/signup")}>
                      Sign up
                    </Button>
                  </span>
                </div>
              )}

              {/* Mobile signup */}
              <span className={`w-full flex gap-2 ${authUser ? "hidden" : ""}`}>
                {isMobile && <Loginmobile />}
                {isMobile && <Signupmobile />}
              </span>
            </span>

            {authUser && (
              <span>
                <Icon icon="Bell" isSolid={false} tooltip="Notifications" />
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
