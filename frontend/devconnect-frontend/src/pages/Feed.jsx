import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative z-10 w-full max-w-2xl mb-10">
      <button
        onClick={() => navigate("/post")}
        className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Create New Post</h3>
            <p className="text-gray-400 text-sm">Share your thoughts with the community</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "John Doe",
        avatar:
          "https://i.pinimg.com/736x/7b/8c/89/7b8c89ebc5cb071f85f4b29de3b8b497.jpg",
      },
      time: "2h ago",
      content:
        "Just deployed my first full-stack project using Golang + React! 🚀 Super smooth experience. #DevConnect #FullStack",
      image: "",
      likes: 42,
      comments: 5,
    },
    {
      id: 2,
      author: {
        name: "Atharv Vatsal",
        avatar:
          "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      },
      time: "5h ago",
      content:
        "Learning about Serverless Edge Computing — fascinating to see how we're moving closer to true zero-latency architecture! ⚡",
      image: "",
      likes: 24,
      comments: 3,
    },
  ]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16 flex flex-col items-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-purple-700/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-pink-700/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-3xl font-bold text-white">DevConnect Feed</h1>
        <p className="text-gray-400 text-sm">
          Share your thoughts, updates, and innovations with the community ✨
        </p>
      </div>

      {/* Add Post Card */}
      <Card />

      {/* Feed Posts */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-6 px-4">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
