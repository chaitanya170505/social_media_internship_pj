import React from "react";
import PostCard from "./PostCard";
import "../styles/PostCardGrid.css";

function PostCardGrid({ posts }) {
  return (
    <main className="post-card-grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}

export default PostCardGrid;
