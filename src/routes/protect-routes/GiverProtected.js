import React from "react";
import { Navigate } from "react-router-dom";

function GiverProtected({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const user = JSON.parse(localStorage.getItem("user")).role;
    const redirectTo =
      user === "caretaker" ? "/care-taker" : "/petsitter-profile"; // Set your condition here
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default GiverProtected;
