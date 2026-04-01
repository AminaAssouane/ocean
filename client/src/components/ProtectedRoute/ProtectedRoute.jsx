import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null); // null = loading

  useEffect(() => {
    api
      .get("/auth")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
