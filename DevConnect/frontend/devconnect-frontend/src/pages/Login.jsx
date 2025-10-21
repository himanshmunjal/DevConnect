import React, { useState, useContext } from "react";
// 🛠️ BUG FIX: Added CheckCircle and AlertCircle
import { Code2, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call is correctly /auth/login
      const res = await api.post("/auth/login", {email, password });

      setPopup({
        show: true,
        // 🛠️ BUG FIX: Changed message to reflect successful login
        message: "Login successful! Redirecting to your feed...",
        type: "success",
      });

      // ✅ Auto-login after successful API call
      login(res.data);
      
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
        // 🛠️ BUG FIX: Changed redirect path from '/login' to '/feed'
        navigate("/feed");
      }, 2000);
    } catch (err) {
      console.error("Login Error:", err);
      // Adjusted error message for clarity
      const errorMessage =
        err.response?.data?.error || "Login failed! Please check your credentials.";

      setPopup({
        show: true,
        message: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center pt-24 pb-10 overflow-hidden">
      {/* Gradient Glows */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-10 w-[30rem] h-[30rem] bg-purple-700/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-pink-700/20 blur-[160px] rounded-full"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-10 shadow-xl mt-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mt-3">DevConnect</h1>
          <p className="text-gray-400 text-sm">Connect • Code • Collaborate</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>
            <input
              type="email"
              placeholder="you@devconnect.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        <div className="flex justify-center gap-4">
          {[Github, Linkedin, Twitter].map((Icon, idx) => (
            <button
              key={idx}
              className="p-3 border border-white/10 bg-white/5 rounded-xl hover:bg-white/20 transition-all"
            >
              <Icon className="w-5 h-5 text-white" />
            </button>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
      
      {popup.show && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-[90%] max-w-sm p-6 rounded-2xl text-center shadow-xl ${
              popup.type === "success"
                ? "bg-green-500/10 border border-green-400/40"
                : "bg-red-500/10 border border-red-400/40"
            }`}
          >
            <div className="flex justify-center mb-3">
              {/* CheckCircle and AlertCircle are now correctly imported */}
              {popup.type === "success" ? (
                <CheckCircle className="w-10 h-10 text-green-400" />
              ) : (
                <AlertCircle className="w-10 h-10 text-red-400" />
              )}
            </div>
            <h2
              className={`text-lg font-semibold ${
                popup.type === "success" ? "text-green-300" : "text-red-300"
              }`}
            >
              {popup.type === "success" ? "Success" : "Error"}
            </h2>
            <p className="text-gray-200 mt-2">{popup.message}</p>
            <button
              onClick={() => setPopup({ show: false, message: "", type: "" })}
              className="mt-4 px-5 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}