import React from "react";
import { Code2, Home, User, Search, FolderKanban, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/feed")}
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-md">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-white">DevConnect</h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-gray-300">
          <button onClick={() => navigate("/feed")} className="hover:text-white transition">
            <Home className="inline-block w-5 h-5 mr-1" /> Feed
          </button>
          <button onClick={() => navigate("/project")} className="hover:text-white transition">
            <FolderKanban className="inline-block w-5 h-5 mr-1" /> Projects
          </button>
          <button onClick={() => navigate("/search")} className="hover:text-white transition">
            <Search className="inline-block w-5 h-5 mr-1" /> Search
          </button>
          <button onClick={() => navigate("/profile")} className="hover:text-white transition">
            <User className="inline-block w-5 h-5 mr-1" /> Profile
          </button>
        </div>

        {/* Logout / Avatar */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}