import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* === BACKGROUND GLOW === */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-purple-700/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-pink-700/20 blur-[180px] rounded-full"></div>
      </div>

      {/* === HERO SECTION === */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        {/* LEFT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center max-w-lg text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              DevConnect
            </h1>
          </div>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
            Connect with passionate developers, collaborate on innovative
            projects, and showcase your skills — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Sign Up
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
        >
          {/* Replace with your image */}
          <img
            src="/assets/hero-image.png"
            alt="Developers working"
            className="w-[90%] md:w-[80%] rounded-2xl border border-white/10 shadow-2xl"
          />
        </motion.div>
      </main>

      {/* === FOOTER === */}
      <footer className="relative z-10 text-center py-6 border-t border-white/10 bg-white/5 backdrop-blur-md">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} DevConnect • Built for developers, by
          developers.
        </p>
      </footer>
    </div>
  );
}
