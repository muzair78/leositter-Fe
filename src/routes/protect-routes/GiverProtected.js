import React from "react";
import { Navigate } from "react-router-dom";

function GiverProtected({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return <Navigate to="/care-taker" replace />;
  }

  return children;
}

export default GiverProtected;
