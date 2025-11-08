import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PostCardGrid from "../components/PostCardGrid";
import axios from "axios";

function HomePage({ posts: propPosts, loading: propLoading }) {
  const [posts, setPosts] = useState(propPosts || []);
  const [loading, setLoading] = useState(propLoading ?? true);
  const [selectedCategory, setSelectedCategory] = useState("Latest");

  // Fetch posts only if not provided via props
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

  useEffect(() => {
    if (!propPosts) {
      fetchPosts();
    } else {
      setPosts(propPosts);
      setLoading(propLoading);
    }
  }, [propPosts, propLoading]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Apply filtering
  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === "Latest") return true;
    return post.category === selectedCategory;
  });

  return (
    <div className="home-page">
      <div className="main-content-layout">
        <Sidebar onCategoryChange={handleCategoryChange} />
        {loading ? (
          <p>Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          <PostCardGrid posts={filteredPosts} />
        ) : (
          <p>No posts available in this category.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
