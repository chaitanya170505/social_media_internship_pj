import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PostView from "./pages/PostView";
import ViewProfile from "./pages/ViewProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostForm from "./components/PostForm";
import Alerts from "./pages/Alerts"; // ✅ Import the new page

function AppContent() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch posts from the server
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on initial component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleForm = () => setShowForm(!showForm);

  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <div className="app-container">
      {!hideLayout && <Header onAlengeClick={toggleForm} />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home posts={posts} loading={loading} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-profile/:username"
          element={
            <ProtectedRoute>
              <ViewProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostView />
            </ProtectedRoute>
          }
        />
        {/* ✅ New Route for Alert Dashboard */}
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showForm && !hideLayout && (
        <div className="overlay">
          <div className="form-container">
            <button className="close-btn" onClick={toggleForm}>
              X
            </button>
            <PostForm onPostCreated={fetchPosts} onClose={toggleForm} />
          </div>
        </div>
      )}

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
