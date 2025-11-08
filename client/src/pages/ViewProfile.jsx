import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ViewProfile.css";

function ViewProfile() {
  const { username } = useParams(); // ✅ Get username from URL
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/view-profile/${username}`)
      .then((res) => {
        setProfile(res.data.user);
        setPosts(res.data.posts);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [username]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="view-profile-container">
      {/* Profile Info */}
      <h2>👤 {profile.username}</h2>
      <p>Email: {profile.email}</p>
      <p>📍 Location: {profile.location || "Not set"}</p>
      <p>📝 Bio: {profile.bio || "No bio available"}</p>

      {/* User Posts */}
      <h3>{profile.username}'s Posts</h3>
      <ul className="view-profile-posts">
        {posts.map((p) => (
          <li key={p.id} className="view-profile-post-item">
            <h4>{p.heading}</h4>
            <p>{p.paragraph}</p>
            {p.image_url && (
              <img
                src={`http://localhost:3000/uploads/${p.image_url}`}
                alt={p.heading}
                className="view-profile-post-image"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewProfile;
