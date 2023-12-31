import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export function ProtectedRoute({ children,redirectTo="/auth/login" }) {
  
  const { user, loading } = useAuth();

  if (loading) return console.log("Validando");

  if (!user) return <Navigate to={redirectTo}/>;

  return children ? children : <Outlet/>
}

