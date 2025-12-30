import React from "react";
import useUser from "@/app/main/hooks/useUser";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useUser();

  if (!authUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
