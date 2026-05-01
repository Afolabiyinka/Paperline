import Logo from "@/components/custom/Logo";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

const AuthLayout = () => {
  const { authUser, isAuthResolved } = useAuthStore();

  if (!isAuthResolved) {
    return (
      <div className="h-screen w-full flex justify-center items-center ">Loading..</div>
    );
  }

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full w-full">
      <nav>
        <Logo />
      </nav>
      <Outlet />
    </div>
  );
};

export default AuthLayout;