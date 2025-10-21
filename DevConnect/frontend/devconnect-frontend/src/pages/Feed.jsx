import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Send, Plus } from "lucide-react";
import PostCard from "../components/PostCard";

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
        "Learning about Serverless Edge Computing — fascinating to see how we’re moving closer to true zero-latency architecture! ⚡",
      image: "",
      likes: 24,
      comments: 3,
    },
  ]);

  const [newPost, setNewPost] = useState({
    content: "",
    image: null,
  });

  const handlePost = () => {
    if (newPost.content.trim() === "") return;
    const post = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
      },
      time: "Just now",
      content: newPost.content,
      image: newPost.image,
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
    setNewPost({ content: "", image: null });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewPost({ ...newPost, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

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

      {/* Create Post Box */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl mb-10">
        <textarea
          placeholder="What's on your mind?"
          value={newPost.content}
          onChange={(e) =>
            setNewPost({ ...newPost, content: e.target.value })
          }
          className="w-full bg-transparent text-white placeholder-gray-400 border-none focus:outline-none resize-none"
          rows="3"
        />
        {newPost.image && (
          <img
            src={newPost.image}
            alt="Preview"
            className="rounded-xl border border-white/10 mt-3"
          />
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer hover:opacity-80 transition">
              <Image className="w-5 h-5 text-purple-400" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={handlePost}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg font-medium hover:scale-105 transition"
          >
            <Send size={16} /> Post
          </button>
        </div>
      </div>

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
