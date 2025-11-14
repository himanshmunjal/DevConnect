import React, { useState } from "react";
import { Image, Send, X } from "lucide-react";
import api from "../services/api";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [type, setType] = useState("project");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" })
  const navigate = useNavigate();
  
  // Get userId with error handling
  const getUserId = () => {
    try {
      return localStorage.getItem("user_id") || "demo-user-123";
    } catch (e) {
      console.warn("localStorage not available, using demo user");
      return "demo-user-123";
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    console.log("✅ Image selected:", file.name, "Size:", (file.size / 1024).toFixed(2), "KB");
  };

  // Remove image
  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setImage(null);
    setPreview(null);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");

    // Validation
    if (!title.trim()) {
      setError("⚠️ Please enter a title!");
      return;
    }

    if (!content.trim()) {
      setError("⚠️ Please enter content!");
      return;
    }

    const userId = getUserId();
    if (!userId) {
      setError("⚠️ Please log in first.");
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content.trim());
      formData.append("type", type);
      formData.append("user_id", userId);
      
      if (image) {
        formData.append("image", image);
        console.log("📎 Image attached:", image.name);
      }

      console.log("📤 Uploading post...");
      
      // Make API call
      const res = await api.post(`/upload/post/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Response:", res.data);
      setPopup({
        show: true,
        // 🛠️ BUG FIX: Changed message to reflect successful login
        message: "Post Uploaded successfully...",
        type: "success",
      });
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
        // 🛠️ BUG FIX: Changed redirect path from '/login' to '/feed'
        navigate("/feed");
      }, 2000);

      // Reset form
      setTitle("");
      setContent("");
      removeImage();
      setType("project");
      
    } catch (err) {
      console.error("❌ Upload failed:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to upload post";
      setError(`❌ ${errorMsg}`);
      setPopup({
        show: true,
        message: err,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16 flex flex-col items-center overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-purple-700/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-pink-700/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200">
            {error}
          </div>
        )}

        {/* Post Type */}
        <div>
          <label className="text-white mb-2 font-medium block">Select type of post</label>
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="project">Project</option>
              <option value="post">Post</option>
              <option value="blog">Blog</option>
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-white mb-2 font-medium block">Enter title for {type}</label>
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <input
              type="text"
              placeholder={`Title for your ${type}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-400 border-none focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-400 border-none focus:outline-none resize-none"
            rows="6"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="relative w-full">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="preview"
                className="max-w-full h-auto max-h-96 object-cover rounded-2xl border-2 border-purple-500 shadow-lg"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-2 transition"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Upload + Post Buttons */}
        <div className="flex items-center gap-4 justify-center">
          <label 
            htmlFor="imageUpload" 
            className="cursor-pointer hover:opacity-80 transition flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg border border-white/20"
          >
            <Image className="w-5 h-5 text-purple-400" />
            <span className="text-white text-sm font-medium">
              {preview ? "Change Image" : "Upload Image"}
            </span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-lg font-medium hover:scale-105 transition shadow-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <Send size={16} />
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        {/* Debug Info */}
        <div className="text-xs text-gray-500 text-center mt-4">
          <p>Title: {title.length} chars | Content: {content.length} chars | Image: {image ? "✓" : "✗"}</p>
        </div>
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