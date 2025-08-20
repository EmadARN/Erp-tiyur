import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../shared/lib/httpService";
import Loading from "@/modules/shared/components/ui/Loading";
export function RequireAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // چک کردن اعتبار توکن‌ها از سرور
    const checkAuth = async () => {
      try {
        await http.kernelApi.get("/auth/validate", { withCredentials: true });
        setIsAuthenticated(true);
      } catch (err) {
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

  // اگر لاگین نبود → بفرست به لاگین
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // در غیر این صورت اجازه ورود
  return <Outlet />;
}
