import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Authenticated({ children }) {
  const auth = localStorage.getItem("token") || null;

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default Authenticated;
