import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.connect()
  .then(() => {
    console.log("✅ Database connection successful");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
  });

export default pool;
