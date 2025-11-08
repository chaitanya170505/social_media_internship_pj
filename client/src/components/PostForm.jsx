import { useState } from "react";
import axios from "axios";
import "../styles/PostForm.css"; // styling

// Accept onPostCreated and onClose as props
function PostForm({ onPostCreated, onClose }) {
  const [formData, setFormData] = useState({
    heading: "",
    paragraph: "",
    location: "",
    category: "Weather", // default
    customCategory: "",
    image: null,
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("heading", formData.heading);
    data.append("paragraph", formData.paragraph);
    data.append("location", formData.location);

    const finalCategory =
      formData.category === "Other" && formData.customCategory
        ? formData.customCategory
        : formData.category;
    data.append("category", finalCategory);

    if (formData.image) {
      data.append("image", formData.image);
    }

    data.append("username", user.username || "Anonymous");

    try {
      await axios.post("http://localhost:3000/users/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Post submitted successfully!");

      // Call the callback to refresh posts
      if (onPostCreated) {
        onPostCreated();
      }

      // Call the callback to close the form
      if (onClose) {
        onClose();
      }

      // Reset form after submit
      setFormData({
        heading: "",
        paragraph: "",
        location: "",
        category: "Weather",
        customCategory: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting post");
    }
  };

  return (
    <div className="postform-container">
      <form onSubmit={handleSubmit} className="postform">
        <h2 className="form-title">Create a New Post</h2>

        <div className="form-group">
          <label>Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Paragraph</label>
          <textarea
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            required
            className="form-textarea"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
          >
            <option value="Weather">Weather</option>
            <option value="Road Blockage">Road Blockage</option>
            <option value="Traffic">Traffic</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.category === "Other" && (
          <div className="form-group">
            <label>Custom Category</label>
            <input
              type="text"
              name="customCategory"
              value={formData.customCategory}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter custom category"
            />
          </div>
        )}

        <div className="form-group">
          <label>Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-file"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;