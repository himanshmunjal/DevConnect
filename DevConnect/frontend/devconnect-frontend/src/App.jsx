import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./Pages/Profile";
import Project from "./pages/Project";
import Register from "./pages/Register";
import Search from "./pages/Search_page";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/search" element={<Search />} />
            <Route path="/project" element={<Project />} />
            <Route path="*" element={<Navigate to="/feed" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}