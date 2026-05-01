import express from "express";
import { connectDb } from "./config/db";
import { syncModels } from "./models";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { configDotenv } from "dotenv";
import { blogRouter } from "./routes/blog";
import cookieParser from "cookie-parser";

configDotenv();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: ["https://paperline-1st.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send(`<h1>View the api docs <a href="https://bk52izj9t0.apidog.io">Here</a></h1>`);
});

// ✅ consolidated into one async start function
const start = async () => {
  try {
    await connectDb();
    await syncModels();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // ✅ exit if DB or sync fails — don't serve a broken app
  }
};

start();