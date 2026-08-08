import { NavLink, useNavigate } from "react-router-dom";
import { NAVLINKS } from "../../libs/navrelated";
import Logo from "@/components/custom/Logo";
import { useIsMobile } from "@/shared/hooks/useMobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Bell, Pen } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useFetchUser } from "@/app/auth/hooks/useFetchUser";
import { useAuthStore } from "@/app/auth/store/authStore";
import ProfileDropdown from "@/app/profile/components/profileDropdown";
import NavIcon from "@/components/custom/NavIcon";
import MenuButton from "@/components/custom/MenuBtn";

const NavBar = () => {
  const isMobile = useIsMobile(768);
  const [open, setOpen] = useState(false);
  const { isLoading } = useFetchUser();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-4 lg:flex items-center justify-between hidden">
        <div className="shrink-0">
          <Logo />
        </div>

        {!isMobile && (
          <div className="flex items-center gap-8 flex-1 ml-8">
            {NAVLINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-normal transition-colors duration-200 ${
                    isActive
                      ? "text-black dark:text-white font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2  md:gap-6">
          <NavIcon icon={Search} linkTo="/search" tooltip="Search here" />

          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
          ) : authUser ? (
            <div className="flex items-center gap-1 md:gap-4">
              {!isMobile && <NavIcon icon={Bell} linkTo="" />}

              <NavIcon
                icon={Pen}
                linkTo="/blogs/create"
                tooltip="Create a new blog"
              />
              <ProfileDropdown />
            </div>
          ) : (
            <div className="md:flex items-center gap-3 hidden">
              <Button
                variant="ghost"
                className="text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-transparent"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
              <Button
                className="text-sm font-normal bg-black dark: text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                onClick={() => navigate("/signup")}
              >
                Write
              </Button>
            </div>
          )}

          {isMobile && (
            <MenuButton open={open} onClick={() => setOpen(!open)} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobile && open && (
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
    </nav>
  );
};

export default NavBar;
