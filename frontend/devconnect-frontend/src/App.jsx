import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import Register from "./pages/Register";
import Search from "./pages/Search_page";
import Navbar from "./components/Navbar";
import ProfileSetup from "./pages/ProfileSetup";
import Post from "./pages/Post";
import Home from "./pages/Home";

// ✅ Private route component (only logged-in users can access)
function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

// ✅ Hide Navbar on Login/Register/Home (optional)
function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/home"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="p-2">{children}</div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/profilesetup"element={<PrivateRoute><ProfileSetup /></PrivateRoute>}/>
            <Route path="/profile"element={<PrivateRoute><Profile /></PrivateRoute>}/>
            <Route path="/feed"element={<PrivateRoute><Feed /></PrivateRoute>}/>
            <Route path="/search"element={<PrivateRoute><Search /></PrivateRoute>}/>
            <Route path="/project"element={<PrivateRoute><Project /></PrivateRoute>}/>
            <Route path="/post" element={<PrivateRoute><Post /></PrivateRoute>}/>
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
