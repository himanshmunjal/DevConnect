import React from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full border border-purple-500 object-cover"
        />
        <div>
          <h3 className="text-white font-semibold text-sm">
            {post.author.name}
          </h3>
          <p className="text-gray-400 text-xs">{post.time}</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="Post media"
          className="rounded-xl w-full mb-4 border border-white/10"
        />
      )}

      <div className="flex justify-between text-gray-400 text-sm mt-2">
        <button className="flex items-center gap-1 hover:text-white">
          <Heart size={16} /> {post.likes}
        </button>
        <button className="flex items-center gap-1 hover:text-white">
          <MessageCircle size={16} /> {post.comments}
        </button>
        <button className="flex items-center gap-1 hover:text-white">
          <Share2 size={16} /> Share
        </button>
      </div>
    </div>
  );
}
