import express from "express";
import pool from "../db.js"; 
import multer from "multer";

const router = express.Router();

// ✅ Multer setup for file upload (store locally for now)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure uploads/ exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Create Post (using username instead of user_id)
router.post("/posts", upload.single("image"), async (req, res) => {
  try {
    const { username, heading, paragraph, location, category } = req.body;
    const image_url = req.file ? `${req.file.filename}` : null;

    // fetch user_id from users table using username
    const userResult = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user_id = userResult.rows[0].id;

    const result = await pool.query(
      `INSERT INTO posts (user_id, heading, paragraph, location, category, image_url, author)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user_id, heading, paragraph, location, category, image_url, username]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});





router.get("/posts", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.heading, p.paragraph, p.location, 
              p.category, p.image_url, p.created_at,
              u.username AS author, u.email
       FROM posts p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
