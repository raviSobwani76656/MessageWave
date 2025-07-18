import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import socket from "../../socket"; // Ensure this is your socket instance
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, MessageSquare } from "lucide-react";
import { useUserStore } from "../store/userStore";

const Login = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setLoading, setUser } = useUserStore();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .required("Password is required"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/loginUser",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      const token = response.data.token;
      const decoded = jwtDecode(token);
      setUser(decoded);

      const roomId = decoded.id;
      const userId = decoded.id;

      if (!socket.connected) {
        socket.connect();
      }

      socket.emit("join-room", { userId, roomId });

      reset();
      setMessage("Login Successful");

      navigate("/login", {
        state: { useName: decoded.name, userId: decoded.userId, room: roomId },
      });
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-gray-500">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="you@example.com"
                  {...register("email")}
                  autoComplete="off"
                />
                {errors.email && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                  {...register("password")}
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              disabled={useUserStore().loading}
            >
              {useUserStore().loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
            {message && (
              <div
                className={`mt-4 text-center ${
                  message.includes("Success")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <div className="text-center">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gray-100 p-6">
        <h2 className="text-3xl font-bold">Welcome back!</h2>
        <p className="text-gray-500 mt-2">
          Sign in to continue your conversations and catch up with your
          messages.
        </p>
      </div>
    </div>
  );
};

export default Login;
