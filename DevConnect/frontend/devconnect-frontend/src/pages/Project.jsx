import React, { useState } from "react";
import { Plus, Edit3, Trash2, FolderKanban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      title: "DevConnect Platform",
      description:
        "A developer networking platform for collaboration, projects, and open-source contributions.",
      tech: ["React", "Go", "PostgreSQL"],
    },
    {
      title: "AI Code Review Bot",
      description:
        "AI-powered tool that reviews pull requests and suggests improvements using GPT-based analysis.",
      tech: ["Node.js", "Python", "OpenAI API"],
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech: "",
  });

  const openModal = (index = null) => {
    if (index !== null) {
      const proj = projects[index];
      setNewProject({
        title: proj.title,
        description: proj.description,
        tech: proj.tech.join(", "),
      });
      setCurrentIndex(index);
    } else {
      setNewProject({ title: "", description: "", tech: "" });
      setCurrentIndex(null);
    }
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setNewProject({ title: "", description: "", tech: "" });
  };

  const handleSave = () => {
    const techArray = newProject.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (currentIndex !== null) {
      const updated = [...projects];
      updated[currentIndex] = { ...newProject, tech: techArray };
      setProjects(updated);
    } else {
      setProjects([...projects, { ...newProject, tech: techArray }]);
    }

    closeModal();
  };

  const handleDelete = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20 text-white overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-purple-700/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-pink-700/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto flex justify-between items-center px-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold">My Projects</h1>
          <p className="text-gray-400 text-sm">
            Showcase your creations, innovations, and collaborations.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        <AnimatePresence>
          {projects.map((proj, index) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl relative group hover:bg-white/15 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-md shadow-md">
                    <FolderKanban className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold">{proj.title}</h2>
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-all">
                  <button
                    onClick={() => openModal(index)}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-gray-400 text-sm mt-3">{proj.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-purple-500/20 border border-purple-400/30 text-purple-200 px-3 py-1 rounded-full text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-8 w-[90%] max-w-lg shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {currentIndex !== null ? "Edit Project" : "Add Project"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />

              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={newProject.tech}
                onChange={(e) =>
                  setNewProject({ ...newProject, tech: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="bg-white/10 px-5 py-2 rounded-lg hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-lg hover:scale-105 transition-all"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
