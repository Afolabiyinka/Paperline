import React from "react";
import useUser from "@/app/main/hooks/useUser";
import { useNavigate } from "react-router-dom";
const ProctectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authUser) {
      navigate("/auth/login");
    }
  }, [authUser]);
  return <div>{children}</div>;
};

export default ProctectedRoute;
