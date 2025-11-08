import express from "express";
import pool from "../db.js"; // make sure this is your PostgreSQL pool

const router = express.Router();

// GET another user's public profile
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch user info
    const userResult = await pool.query(
      "SELECT username, email, location, bio FROM users WHERE username = $1",
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user's posts
    const postsResult = await pool.query(
      "SELECT * FROM posts WHERE author = $1 ORDER BY created_at DESC",
      [username]
    );

    res.json({ user: userResult.rows[0], posts: postsResult.rows });
  } catch (err) {
    console.error("Error fetching view-profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
