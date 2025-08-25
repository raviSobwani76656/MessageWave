import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { createAccount, isSigningUp } = useUserStore();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Please Enter your name"),
    email: yup.string().email().required("Please Enter the email"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password should be at most 20 characters")
      .required("Please Enter your desired password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Please Enter your desired password"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const success = await createAccount(data);

    if (success) {
      reset();
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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-gray-500">Sign up to get started</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your name"
                  {...register("name")}
                  autoComplete="off"
                />
                {errors.name && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>

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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
            >
              Create Account
            </button>
            {successMessage && (
              <div
                className={`mt-4 text-center ${
                  successMessage.includes("Success")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {successMessage}
              </div>
            )}
          </form>

          <div className="text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gray-100 p-6">
        <h2 className="text-3xl font-bold">Get Started!</h2>
        <p className="text-gray-500 mt-2">
          Create an account to start your conversations and connect with others.
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
