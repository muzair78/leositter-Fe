import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoutes;
