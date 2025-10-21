import React, { useState, useContext } from "react";
import { Code2, CheckCircle, AlertCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tagline, setTagline] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" }); // popup state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Password validation function
  const isValidPassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ Check password strength
    if (!isValidPassword(password)) {
      setPopup({
        show: true,
        message: "Password must be at least 8 characters long and include a number and special character.",
        type: "error",
      });
      return;
    }

    try {
      const res = await api.post("/auth/signup", { name, email, password, tagline });

      // ✅ Show success modal
      setPopup({
        show: true,
        message: "Registration successful! Redirecting to feed...",
        type: "success",
      });

      // ✅ Auto-login after signup
      login(res.data);
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMessage =
        err.response?.data?.error || "Registration failed! Please try again.";

      setPopup({
        show: true,
        message: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Gradient lights */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-700/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Main register card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-10 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mt-3">Join DevConnect</h1>
          <p className="text-gray-400 text-sm">Start your developer journey</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
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
            <p className="text-xs text-gray-400 mt-1">
              Must be at least 8 characters, include 1 number and 1 special character.
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Tagline</label>
            <input
              type="text"
              placeholder="Enter your tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>

      {/* ✅ Popup Modal */}
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
