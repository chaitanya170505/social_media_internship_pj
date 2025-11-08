import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../styles/PostCard.css";

function PostCard({ post }) {
  const [showFull, setShowFull] = useState(false);

  // Limit heading to 5 words
  const headingWords = post.heading.split(" ").slice(0, 5).join(" ");

  // Paragraph truncation
  const maxWords = 25;
  const paragraphWords = post.paragraph.split(" ");
  const shortParagraph =
    paragraphWords.length > maxWords
      ? paragraphWords.slice(0, maxWords).join(" ") + "..."
      : post.paragraph;

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-card-header">
        <h3 className="card-title">{headingWords}</h3>
        <span className="category-tag">{post.category}</span>
      </div>

      {/* Body */}
      <div className="post-card-body">
        {/* ✅ Author name links to view-profile page */}
        <p className="card-author">
          👤{" "}
          <Link to={`/view-profile/${post.author}`} className="author-link">
            {post.author}
          </Link>
        </p>

        <p className="card-location">📍 {post.location}</p>
        <p className="card-date">
          {new Date(post.created_at).toLocaleString()}
        </p>

        {/* Truncated Paragraph */}
        <p className="card-description">
          {showFull ? post.paragraph : shortParagraph}{" "}
          {paragraphWords.length > maxWords && (
            <span
              className="read-more"
              onClick={() => setShowFull(!showFull)}
            >
              {showFull ? "Show less" : "Read more"}
            </span>
          )}
        </p>

        {/* Image */}
        {post.image_url && (
          <img
            src={`http://localhost:3000/uploads/${post.image_url}`}
            alt={post.heading}
            className="post-image"
          />
        )}
      </div>
    </div>
  );
}

export default PostCard;
