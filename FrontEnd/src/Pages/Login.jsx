import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import socket from "../../socket";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FaEye, FaLock, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await axios.post(
        "http://localhost:5000/user/loginUser",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data.message);

      const token = response.data.token;
      console.log("Raw token:", token);

      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      const roomId = decoded.id;
      const userId = decoded.id;

      if (!socket.connected) {
        socket.connect();
      }

      socket.emit("join-room", {
        userId,
        roomId,
      });

      reset();
      setMessage("Login Successful");

      navigate("/login", {
        state: { useName: decoded.name, userId: decoded.userId, room: roomId },
      });
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-4">
        <input
          type="email"
          className="border border-gray-400 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          {...register("email")}
          autoComplete="off"
        />

        {errors.email && (
          <span className="absolute top-full left-0 mt-1 text-sm bg-red-500 text-white px-2 py-1 rounded shadow">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          className="border border-gray-400 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          {...register("password")}
          autoComplete="off"
        />
        <span
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
        {errors.password && (
          <span className="absolute top-full left-0 mt-1 text-sm bg-red-500 text-white px-2 py-1 rounded shadow">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 py-2 px-6 text-white rounded transition-colors"
      >
        Login
      </button>
      {message && <div className="mt-4 text-green">{message}</div>}
    </form>
  );
}

export default Login;
