import express from "express";
import pool from "../db.js";

const router = express.Router();

// ✅ Get Profile (with posts)
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // fetch user
    const userResult = await pool.query(
      "SELECT id, username, email, location, bio, profile_pic FROM users WHERE username = $1",
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    // fetch posts
    const postsResult = await pool.query(
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC",
      [user.id]
    );

    res.json({ user, posts: postsResult.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update Profile
router.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { location, bio, profile_pic } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET location = $1, bio = $2, profile_pic = $3
       WHERE username = $4
       RETURNING id, username, email, location, bio, profile_pic`,
      [location, bio, profile_pic, username]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
