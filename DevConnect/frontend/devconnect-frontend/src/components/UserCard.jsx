import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/profile/${user.id}`)}
      className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:bg-white/15 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full border border-purple-400 object-cover"
          />
        ) : (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
          <p className="text-gray-400 text-sm">{user.role}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mt-3 line-clamp-2">
        {user.tagline || "Passionate developer building cool things."}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {user.skills?.slice(0, 4).map((skill, idx) => (
          <span
            key={idx}
            className="bg-purple-500/20 border border-purple-400/30 text-purple-200 px-2 py-1 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
