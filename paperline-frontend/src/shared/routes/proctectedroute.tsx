import { useAuthStore } from "@/app/auth/store/authStore";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
