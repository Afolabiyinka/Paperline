import Logo from "@/components/custom/Logo";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

const AuthLayout = () => {
  const { authUser } = useAuthStore()
  if (authUser) {
    return <Navigate to={`/`} />
  }
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
