import { NavLink, useNavigate } from "react-router-dom";
import { NAVLINKS } from "../libs/navrelated";
import Logo from "@/components/Logo";
import { useIsMobile } from "@/hooks/useMobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useUser from "@/app/main/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/Icon";

const NavBar = () => {
  const isMobile = useIsMobile(1024);
  const [open, setOpen] = useState(false);
  const { authUser } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="w-full border-b px-4 lg:px-8 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between bg-background">
      {/* Top row */}
      <div className="w-full flex items-center justify-between lg:w-auto">
        <Logo />

        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
          >
            {open ? <X size={22} /> : <AlignRight size={22} />}
          </button>
        )}
      </div>

      {/* Menu */}
      <AnimatePresence>
        {(open || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full lg:w-auto mt-4 lg:mt-0 flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center"
          >
            {/* Nav links */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full lg:w-auto">
              {NAVLINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-medium transition hover:opacity-80 ${
                      isActive ? "underline underline-offset-4" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
              {authUser ? (
                <div className="flex items-center gap-3">
                  <Icon icon="Bell" isSolid={false} tooltip="Notifications" />

                  <Avatar
                    onClick={() => navigate("/settings")}
                    className="cursor-pointer size-10"
                  >
                    <AvatarImage src={authUser.profilePic || undefined} />
                    <AvatarFallback>
                      {authUser.username?.substring(0, 2) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Button
                    variant="link"
                    onClick={() => navigate("/auth/login")}
                  >
                    Log in
                  </Button>
                  <Button onClick={() => navigate("/auth/signup")}>
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
