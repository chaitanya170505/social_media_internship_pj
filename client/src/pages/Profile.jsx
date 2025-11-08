import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";
import { Link } from "react-router-dom"; 

function Profile() {
  const { user } = useContext(AuthContext); // get logged in user from context
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({ location: "", bio: "" });

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:3000/profile/${user.username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setProfile(res.data.user);
        setPosts(res.data.posts);
        setNewData({
          location: res.data.user.location || "",
          bio: res.data.user.bio || "",
        });
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [user]);

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/profile/${user.username}`,
        newData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProfile(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="user-profile-container">
  <h2>🤠 {profile.username}</h2>
  <p>Email: {profile.email}</p>

  {isEditing ? (
    <>
      <input
        type="text"
        className="user-profile-input"
        value={newData.location}
        onChange={(e) =>
          setNewData({ ...newData, location: e.target.value })
        }
        placeholder="Enter location"
      />
      <textarea
        className="user-profile-textarea"
        value={newData.bio}
        onChange={(e) =>
          setNewData({ ...newData, bio: e.target.value })
        }
        placeholder="Tell us about yourself"
      />
      <button
        className="user-profile-button save"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="user-profile-button cancel"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <p>📍 Location: {profile.location || "Not set"}</p>
      <p>📝 Bio: {profile.bio || "No bio yet"}</p>
      <button
        className="user-profile-button save"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>
    </>
  )}

  <h3>Your Posts</h3>
<ul className="user-profile-posts">
  {posts.map((p) => (
    <li key={p.id} className="user-profile-post-item">
      <Link to={`/post/${p.id}`} className="user-profile-post-link">
        {p.heading}
      </Link>
    </li>
  ))}
</ul>
</div>

  );
}

export default Profile;
