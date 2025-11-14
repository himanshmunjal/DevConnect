import React, { useState, useEffect } from "react";
import { UserCircle, Edit3, Save, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [about, setAbout] = useState("");
  const [tagline, setTagline] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [innovations, setInnovations] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [post,  setPost] = useState([])
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        console.log("Fetched profile:", data);

        setAbout(data.aboutme|| "")
        setName(data.name || "");
        setRole(data.role || "Developer");
        setTagline(data.tagline || "");
        setSkills(data.skills || []);
        setProjects(data.projects || []);
        setAchievements(data.achievements || []);
        setInnovations(data.innovations || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
        showPopup("Failed to fetch profile details.", "error");
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) fetchProfile();
  }, [userId, token]);

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  // Add functions for projects
  const handleAddProject = () => {
    setProjects([...projects, "New Project: Description"]);
  };

  const handleUpdateProject = (index, value) => {
    const updated = [...projects];
    updated[index] = value;
    setProjects(updated);
  };

  const handleRemoveProject = (indexToRemove) => {
    setProjects(projects.filter((_, idx) => idx !== indexToRemove));
  };

  // Add functions for achievements
  const handleAddAchievement = () => {
    setAchievements([...achievements, "New Achievement: Description"]);
  };

  const handleUpdateAchievement = (index, value) => {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  };

  const handleRemoveAchievement = (indexToRemove) => {
    setAchievements(achievements.filter((_, idx) => idx !== indexToRemove));
  };

  // Add functions for innovations
  const handleAddInnovation = () => {
    setInnovations([...innovations, "New Innovation: Description"]);
  };

  const handleUpdateInnovation = (index, value) => {
    const updated = [...innovations];
    updated[index] = value;
    setInnovations(updated);
  };

  const handleRemoveInnovation = (indexToRemove) => {
    setInnovations(innovations.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSave = async () => {
    try {
      // Include ALL profile fields that should be saved
      const profileData = {
        name,
        role,
        about,
        tagline,
        skills,
        projects,
        achievements,
        innovations,
      };

      console.log("Saving profile data:", profileData);

      const response = await api.put(`/profile/${userId}`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Save response:", response.data);
      
      setIsEditing(false);
      showPopup("✅ Profile updated successfully!", "success");
    } catch (err) {
      console.error("Error updating profile:", err);
      console.error("Error response:", err.response?.data);
      showPopup("❌ Failed to update profile.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20 text-white">
      {/* Popup Notification */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 right-6 z-50 px-6 py-3 rounded-lg shadow-lg ${
              popup.type === "success"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟣 Cover Section */}
      <div className="relative w-full h-64 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-slate-900 object-cover"
              />
            ) : (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-md">
                <UserCircle className="w-28 h-28 text-white" />
              </div>
            )}
            <label
              htmlFor="upload"
              className="absolute bottom-1 right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-md cursor-pointer hover:scale-105 transition"
            >
              Upload
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* 🧑 Profile Info */}
      <div className="flex flex-col items-center mt-20">
        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="text-3xl font-bold bg-transparent text-center border-b border-purple-400 focus:outline-none w-60"
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Your Role"
              className="text-gray-400 text-sm bg-transparent text-center border-b border-pink-400 mt-1 w-56 focus:outline-none"
            />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-gray-400">{role}</p>
          </>
        )}
        <div className="mt-4 flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 flex items-center gap-2"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition"
              >
                <Save size={16} /> Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 flex items-center gap-2"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🌐 Tabs */}
      <div className="flex justify-center gap-6 mt-12 text-gray-400">
        {["Overview", "Projects", "Achievements", "Innovations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === tab
                ? "text-white border-pink-500"
                : "border-transparent hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🧩 Tab Content */}
      <div className="max-w-5xl mx-auto mt-8 px-6">
        <AnimatePresence mode="wait">
          {/* 🟢 Overview */}
          {activeTab === "Overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* About */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                {isEditing ? (
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full bg-transparent border border-white/20 rounded-md p-3 text-gray-300 focus:ring-2 focus:ring-purple-500"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-300">{about || "No information provided."}</p>
                )}
              </div>

              {/* Tagline */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Tagline</h2>
                {isEditing ? (
                  <textarea
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Your professional tagline..."
                    className="w-full bg-transparent border border-white/20 rounded-md p-3 text-gray-300 focus:ring-2 focus:ring-purple-500"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-300 italic">{tagline || "No tagline set."}</p>
                )}
              </div>

              {/* Skills */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-3 mb-4">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-500/20 border border-purple-400/40 text-purple-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(idx)}
                          className="hover:text-red-400"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                      className="flex-1 bg-transparent border border-white/20 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 rounded-md flex items-center gap-1 hover:scale-105 transition"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 🟣 Projects */}
          {activeTab === "Projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {isEditing && (
                <button
                  onClick={handleAddProject}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition"
                >
                  <Plus size={16} /> Add Project
                </button>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {projects.length > 0 ? (
                  projects.map((proj, idx) => {
                    if (isEditing) {
                      return (
                        <div
                          key={idx}
                          className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">Project {idx + 1}</h3>
                            <button
                              onClick={() => handleRemoveProject(idx)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <textarea
                            value={proj}
                            onChange={(e) => handleUpdateProject(idx, e.target.value)}
                            placeholder="Title: Description"
                            className="w-full bg-transparent border border-white/20 rounded-md p-3 text-gray-300 focus:ring-2 focus:ring-purple-500"
                            rows={3}
                          />
                        </div>
                      );
                    }
                    const [title, desc] = proj.split(":");
                    return (
                      <div
                        key={idx}
                        className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                      >
                        <h3 className="text-lg font-semibold mb-2">{title?.trim()}</h3>
                        <p className="text-gray-400 text-sm">{desc?.trim()}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400">No projects found.</p>
                )}
              </div>
            </motion.div>
          )}

          {/* 🏆 Achievements */}
          {activeTab === "Achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {isEditing && (
                <button
                  onClick={handleAddAchievement}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition"
                >
                  <Plus size={16} /> Add Achievement
                </button>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.length > 0 ? (
                  achievements.map((ach, idx) => {
                    if (isEditing) {
                      return (
                        <div
                          key={idx}
                          className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">Achievement {idx + 1}</h3>
                            <button
                              onClick={() => handleRemoveAchievement(idx)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <textarea
                            value={ach}
                            onChange={(e) => handleUpdateAchievement(idx, e.target.value)}
                            placeholder="Title: Description"
                            className="w-full bg-transparent border border-white/20 rounded-md p-3 text-gray-300 focus:ring-2 focus:ring-purple-500"
                            rows={3}
                          />
                        </div>
                      );
                    }
                    const [title, desc] = ach.split(":");
                    return (
                      <div
                        key={idx}
                        className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                      >
                        <h3 className="text-lg font-semibold mb-2">{title?.trim()}</h3>
                        <p className="text-gray-400 text-sm">{desc?.trim()}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400">No achievements found.</p>
                )}
              </div>
            </motion.div>
          )}

          {/* 💡 Innovations */}
          {activeTab === "Innovations" && (
            <motion.div
              key="innovations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {isEditing && (
                <button
                  onClick={handleAddInnovation}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition"
                >
                  <Plus size={16} /> Add Innovation
                </button>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {innovations.length > 0 ? (
                  innovations.map((inv, idx) => {
                    if (isEditing) {
                      return (
                        <div
                          key={idx}
                          className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">Innovation {idx + 1}</h3>
                            <button
                              onClick={() => handleRemoveInnovation(idx)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <textarea
                            value={inv}
                            onChange={(e) => handleUpdateInnovation(idx, e.target.value)}
                            placeholder="Title: Description"
                            className="w-full bg-transparent border border-white/20 rounded-md p-3 text-gray-300 focus:ring-2 focus:ring-purple-500"
                            rows={3}
                          />
                        </div>
                      );
                    }
                    const [title, desc] = inv.split(":");
                    return (
                      <div
                        key={idx}
                        className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                      >
                        <h3 className="text-lg font-semibold mb-2">{title?.trim()}</h3>
                        <p className="text-gray-400 text-sm">{desc?.trim()}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400">No innovations found.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}