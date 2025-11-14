import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Sparkles, PlusCircle, Trash2 } from "lucide-react";

export default function ProfileSetup() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [tagline, setTagline] = useState("");
  const [projects, setProjects] = useState([{ title: "", details: "" }]);
  const [achievements, setAchievements] = useState([{ title: "", details: "" }]);
  const [innovations, setInnovations] = useState([{ title: "", details: "" }]);

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleAddField = (setter, state) => {
    setter([...state, { title: "", details: "" }]);
  };

  const handleRemoveField = (setter, state, index) => {
    if (state.length > 1) {
      const updated = state.filter((_, i) => i !== index);
      setter(updated);
    }
  };

  const handleChange = (setter, state, index, field, value) => {
    const updated = [...state];
    updated[index][field] = value;
    setter(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const userid = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
  
    if (!userid) {
      setPopup({ show: true, message: "User ID missing. Please login again.", type: "error" });
      setLoading(false);
      return;
    }
  
    // Convert array objects into formatted strings for backend
    const profileData = {
      about: about,
      tagline: tagline,
      skills: skills.split(",").map((s) => s.trim()),
      projects: projects.map((p) => `${p.title}: ${p.details}`),
      achievements: achievements.map((a) => `${a.title}: ${a.details}`),
      innovations: innovations.map((i) => `${i.title}: ${i.details}`),
    };
  
    try {
      // ✅ Correct API call
      const res = await api.post(`/profile/${userid}`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Profile saved:", res.data);
  
      setPopup({
        show: true,
        message: "Profile setup completed successfully!",
        type: "success",
      });
  
      // ✅ Redirect to feed after success
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
        navigate("/feed");
      }, 1500);
    } catch (err) {
      console.error("Profile Save Error:", err.response?.data || err.message);
      setPopup({
        show: true,
        message:
          err.response?.data?.error ||
          "Failed to save profile. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-700/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-10 shadow-xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="ml-3 text-3xl font-bold">Complete Your Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* About Me */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">About Me</label>
            <textarea
              rows="3"
              placeholder="Write something about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            ></textarea>
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

          {/* Skills */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Skills (comma separated)
            </label>
            <input
              type="text"
              placeholder="Golang, React, PostgreSQL"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Projects Section */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-300 mb-2 block">Projects</label>
              <button
                type="button"
                onClick={() => handleAddField(setProjects, projects)}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
              >
                <PlusCircle size={16} /> Add Project
              </button>
            </div>
            {projects.map((project, index) => (
              <div key={index} className="space-y-2 mb-3">
                <input
                  type="text"
                  placeholder={`Project ${index + 1} Title`}
                  value={project.title}
                  onChange={(e) =>
                    handleChange(setProjects, projects, index, "title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <textarea
                  rows="2"
                  placeholder={`Project ${index + 1} Details`}
                  value={project.details}
                  onChange={(e) =>
                    handleChange(setProjects, projects, index, "details", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField(setProjects, projects, index)}
                    className="flex items-center gap-1 text-red-400 text-xs hover:text-red-300"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Achievements Section */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-300 mb-2 block">Achievements</label>
              <button
                type="button"
                onClick={() => handleAddField(setAchievements, achievements)}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
              >
                <PlusCircle size={16} /> Add Achievement
              </button>
            </div>
            {achievements.map((ach, index) => (
              <div key={index} className="space-y-2 mb-3">
                <input
                  type="text"
                  placeholder={`Achievement ${index + 1} Title`}
                  value={ach.title}
                  onChange={(e) =>
                    handleChange(setAchievements, achievements, index, "title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <textarea
                  rows="2"
                  placeholder={`Achievement ${index + 1} Details`}
                  value={ach.details}
                  onChange={(e) =>
                    handleChange(setAchievements, achievements, index, "details", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                {achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveField(setAchievements, achievements, index)
                    }
                    className="flex items-center gap-1 text-red-400 text-xs hover:text-red-300"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Innovations Section */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-300 mb-2 block">Innovations</label>
              <button
                type="button"
                onClick={() => handleAddField(setInnovations, innovations)}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
              >
                <PlusCircle size={16} /> Add Innovation
              </button>
            </div>
            {innovations.map((inn, index) => (
              <div key={index} className="space-y-2 mb-3">
                <input
                  type="text"
                  placeholder={`Innovation ${index + 1} Title`}
                  value={inn.title}
                  onChange={(e) =>
                    handleChange(setInnovations, innovations, index, "title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <textarea
                  rows="2"
                  placeholder={`Innovation ${index + 1} Details`}
                  value={inn.details}
                  onChange={(e) =>
                    handleChange(setInnovations, innovations, index, "details", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                {innovations.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveField(setInnovations, innovations, index)
                    }
                    className="flex items-center gap-1 text-red-400 text-xs hover:text-red-300"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold transition-all duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
            }`}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
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