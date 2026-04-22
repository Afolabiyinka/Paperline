import Logo from "@/components/custom/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen w-full">
      <nav>
        <Logo />
      </nav>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
