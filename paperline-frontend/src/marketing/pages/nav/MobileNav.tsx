import ProfileDropdown from "@/app/profile/components/profileDropdown";
import Logo from "@/components/custom/Logo";
import MenuButton from "@/components/custom/MenuBtn";
import NavIcon from "@/components/custom/NavIcon";
import { AnimatePresence } from "framer-motion";
import { PenLine, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { NAVLINKS } from "@/marketing/libs/navrelated";
import { useAuthStore } from "@/app/auth/store/authStore";
import { Button } from "@/components/ui/button";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  return (
    <div className="p-2  flex flex-col  relative">
      <span className="w-full flex justify-between items-center">
        <Logo />
        <div className="flex items-center justify-center gap-2">
          <NavIcon icon={Search} linkTo="/search" tooltip="Search here" />
          <NavIcon
            icon={PenLine}
            linkTo="/blogs/create"
            tooltip="Create a new blog"
          />
          <ProfileDropdown />
          <MenuButton open={open} onClick={() => setOpen(!open)} />
        </div>
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-gray-800  dark:bg-black"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-4">
              {NAVLINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-normal transition-colors ${
                      isActive
                        ? "text-black dark:text-white font-medium"
                        : "text-gray-600 dark:text-gray-400"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {!authUser && (
                <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                  <Button
                    variant="ghost"
                    className="flex-1 text-sm font-normal"
                    onClick={() => {
                      navigate("/login");
                      setOpen(false);
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    className="flex-1 text-sm font-normal bg-black dark: text-white dark:text-black"
                    onClick={() => {
                      navigate("/signup");
                      setOpen(false);
                    }}
                  >
                    Write
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
