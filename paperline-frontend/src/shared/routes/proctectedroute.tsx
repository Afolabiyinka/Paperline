import { useAuthStore } from "@/app/auth/store/authStore";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, isAuthResolved } = useAuthStore();

  if (!isAuthResolved) {
    return (
      <div className="h-screen w-full flex justify-center items-center">Loading..</div>
    );
  }

  if (!authUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
