import React, { useState } from "react";
import { UserCircle, Edit3, Save, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("John Doe");
  const [role, setRole] = useState("Full Stack Developer");
  const [about, setAbout] = useState(
    "Passionate developer with experience in building scalable web applications using React, Node.js, and MongoDB. Always learning and exploring new technologies."
  );
  const [tagline, setTagline] = useState(
    "“Code is poetry, and I’m here to craft beautiful verses in the digital realm.”"
  );
  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "Golang",
    "PostgreSQL",
    "Docker",
    "Tailwind CSS",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditing, setIsEditing] = useState(false);

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
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20 text-white">
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
              className="text-3xl font-bold bg-transparent text-center border-b border-purple-400 focus:outline-none w-60"
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition"
            >
              <Save size={16} /> Save Changes
            </button>
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
          {activeTab === "Overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* About Me */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                {isEditing ? (
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full bg-transparent border border-white/20 rounded-md p-3 text-gray-300 focus:ring-2 focus:ring-purple-500"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-300">{about}</p>
                )}
              </div>

              {/* Tagline */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Tagline</h2>
                {isEditing ? (
                  <textarea
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-transparent border border-white/20 rounded-md p-3 text-gray-300 focus:ring-2 focus:ring-purple-500"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-300 italic">{tagline}</p>
                )}
              </div>

              {/* Skills */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-3 mb-4">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-500/20 border border-purple-400/40 text-purple-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
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

          {/* Projects Tab */}
          {activeTab === "Projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {["DevConnect Platform", "AI Code Review Bot", "SkillSwap"].map(
                (project) => (
                  <div
                    key={project}
                    className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                  >
                    <h3 className="text-lg font-semibold mb-2">{project}</h3>
                    <p className="text-gray-400 text-sm">
                      A modern full-stack project demonstrating innovative use of
                      AI and scalable architecture.
                    </p>
                  </div>
                )
              )}
            </motion.div>
          )}

          {/* Achievements Tab */}
          {activeTab === "Achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Hackathons</h2>
                <ul className="text-gray-300 list-disc list-inside space-y-2">
                  <li>Winner — HackVIT 2024 (AI Track)</li>
                  <li>Runner-up — CodeFury 2023</li>
                </ul>
              </div>
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Certifications</h2>
                <ul className="text-gray-300 list-disc list-inside space-y-2">
                  <li>AWS Cloud Practitioner</li>
                  <li>Google Data Analytics Professional</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Innovations Tab */}
          {activeTab === "Innovations" && (
            <motion.div
              key="innovations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Research</h2>
                <p className="text-gray-300">
                  Working on a research paper on “AI-assisted Developer Productivity Enhancement using LLMs”.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Patents</h2>
                <p className="text-gray-300">
                  Filed a patent for “Autonomous Testing Framework for Web Applications”.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
