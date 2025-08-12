import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 اضافه شد
import logo from "../../../assets/images/logo.png";
import { useToast } from "@/modules/shared/hooks/use-toast";
import TextInput from "@/modules/shared/components/ui/TextInput";
import { useLoginMutation } from "../api/Login";

const LoginPage: React.FC = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password }).unwrap();
      showToast("Login successful", "success");

      navigate("/dashboard");
    } catch (err: any) {
      showToast(err?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 px-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-gradient-to-b from-blue-600 to-blue-400 text-white p-8 flex flex-col justify-center items-center relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg viewBox="0 0 1440 320" className="w-full h-full">
              <path
                fill="#ffffff"
                fillOpacity="0.2"
                d="M0,128L40,160C80,192,160,256,240,240C320,224,400,128,480,90.7C560,53,640,75,720,101.3C800,128,880,160,960,154.7C1040,149,1120,107,1200,117.3C1280,128,1360,192,1400,224L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
              ></path>
            </svg>
          </div>

          <div className="z-10 text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <img src={logo} alt="Logo" className="w-80 h-full" />
            </div>
            <h2 className="text-2xl font-bold">
              Welcome to Tiour Slaughterhouse ERP System
            </h2>
            <p className="text-sm mt-2">
              Integrated management of slaughtering processes, warehousing, and
              poultry distribution. Please log in to your account to continue.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 bg-white z-10">
          <h1 className="text-primary text-2xl font-bold text-center mb-6">
            Slaughterhouse Management Panel Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-dark text-sm mb-1">Username </label>
              <TextInput
                value={username}
                onChange={setUserName}
                inputType="text"
                className="w-full px-4 py-2  focus:outline-none focus:ring-2 focus:ring-primary text-[#111]"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-dark text-sm mb-1">Password</label>
              <TextInput
                value={password}
                onChange={setPassword}
                inputType="password"
                className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-[#111]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 cursor-pointer hover:bg-blue-800 text-white py-2 rounded font-medium transition disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="flex justify-between text-sm text-dark mt-4">
            <Link to="#" className="hover:text-blue-600">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
