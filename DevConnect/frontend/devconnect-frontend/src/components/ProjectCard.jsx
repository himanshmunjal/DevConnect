import React from "react";
import { FolderKanban, Edit3, Trash2 } from "lucide-react";

export default function ProjectCard({ project, onEdit, onDelete, editable }) {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-md shadow-md">
            <FolderKanban className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            {project.title}
          </h3>
        </div>

        {editable && (
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-400 text-sm mt-3 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tech.map((t, i) => (
          <span
            key={i}
            className="bg-purple-500/20 border border-purple-400/30 text-purple-200 px-3 py-1 rounded-full text-xs"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
