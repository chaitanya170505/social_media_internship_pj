import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/PostView.css";

function PostView() {
  const { id } = useParams(); // ✅ Get post ID from URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="post-view-container">
      <h2>{post.heading}</h2>
      <p className="post-view-meta">
        👤 {post.author} | 📍 {post.location} | 🕒{" "}
        {new Date(post.created_at).toLocaleString()}
      </p>
      <p className="post-view-category">Category: {post.category}</p>
      <p className="post-view-description">{post.paragraph}</p>

      {post.image_url && (
        <img
          src={`http://localhost:3000/uploads/${post.image_url}`}
          alt={post.heading}
          className="post-view-image"
        />
      )}
    </div>
  );
}

export default PostView;
