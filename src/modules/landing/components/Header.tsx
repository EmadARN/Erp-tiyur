import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "@/modules/shared/lib/httpService";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
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

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">Slaughter ERP</div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#hero"
            className="text-gray-900 hover:text-purple-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-gray-900 hover:text-purple-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#why"
            className="text-gray-900 hover:text-purple-600 transition-colors"
          >
            Why Slaughter ERP
          </a>
          <a
            href="#contact"
            className="text-gray-900 hover:text-purple-600 transition-colors"
          >
            Contact
          </a>
        </div>

        {!loading && (
          <>
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-500 transition-all"
              >
                <MdDashboard size={20} />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/auth/login")}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition-all btn-hover"
              >
                Get Started
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
