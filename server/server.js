import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js"; // ✅ new import
import path from "path";              // ✅ Add this
import profileRoutes from "./routes/profileRoutes.js"; 
import profileView from "./routes/viewProfile.js"; 
import posts from "./routes/post.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes); // ✅ mount user routes
app.use("/profile", profileRoutes);
app.use("/posts", posts);
app.use("/view-profile", profileView);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
