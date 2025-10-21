import React, { useState } from "react";
import { Search, User, FolderKanban, FileText, Hash, ArrowBigUp } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Users");

  const tabs = [
    { name: "Users", icon: <User className="w-4 h-4 inline-block mr-1" /> },
    { name: "Projects", icon: <FolderKanban className="w-4 h-4 inline-block mr-1" /> },
    { name: "Posts", icon: <FileText className="w-4 h-4 inline-block mr-1" /> },
    { name: "Tags", icon: <Hash className="w-4 h-4 inline-block mr-1" /> },
    { name:"Trending", icon: <ArrowBigUp className="w-4 h-4 inline-block mr-1"/>}
  ];

  const results = {
    Users: ["John Doe", "Emma Watson", "Alex Turner"],
    Projects: ["DevConnect Platform", "SkillSwap", "AI Code Review Bot", "CampusNest"],
    Posts: ["Building AI Agents", "React Tips for 2025", "Serverless Edge Explained"],
    Tags: ["#React", "#AI", "#Golang", "#DataScience", "#Cloud"],
    Trending:["OpenAI", "Inflation", "Layoffs"]
  };

  const filteredResults = results[activeTab].filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-16 flex flex-col items-center overflow-hidden">
      {/* Glowing Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-purple-700/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-pink-700/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 shadow-xl flex items-center gap-3">
        <Search className="text-white w-6 h-6 opacity-80" />
        <input
          type="text"
          placeholder="Search DevConnect..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Tabs */}
      <div className="relative z-10 flex gap-6 mt-8 text-gray-400">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`pb-2 text-sm md:text-base border-b-2 transition-all ${
              activeTab === tab.name
                ? "text-white border-pink-500"
                : "border-transparent hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Results Section */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-5xl mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6"
      >
        {filteredResults.length ? (
          filteredResults.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg cursor-pointer hover:bg-white/15 transition-all"
            >
              <h3 className="font-semibold text-lg mb-2 text-white">{item}</h3>
              <p className="text-gray-400 text-sm">
                {activeTab === "Users" && "Developer on DevConnect"}
                {activeTab === "Projects" && "Open-source full-stack project"}
                {activeTab === "Posts" && "Shared by top contributors"}
                {activeTab === "Tags" && "Explore projects and posts using this tag"}
                {activeTab === "Trending" && "Explore latest trending hot topics"}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center mt-10">
            No {activeTab.toLowerCase()} found for "{query}"
          </p>
        )}
      </motion.div>
    </div>
  );
}
