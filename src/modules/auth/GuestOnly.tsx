import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../shared/lib/httpService";
import Loading from "@/modules/shared/components/ui/Loading";
export function GuestOnly() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await http.kernelApi.get("/auth/validate", { withCredentials: true });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
}
