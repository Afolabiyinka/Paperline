import express from "express";
import { connectDb } from "./shared/database/connect";
import { syncModels } from "./shared/database/sync";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.routes";
import { configDotenv } from "dotenv";
import { blogRouter } from "./modules/blogs/blog.routes";
import cookieParser from "cookie-parser";
import { UserRouter } from "./modules/user/user.routes";
import { limiter } from "./shared/middleware/rateLimiters";
import helmet from "helmet";

configDotenv();

const PORT = process.env.PORT || 8000;
const app = express();


app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: ["https://paperline-1st.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send(`<h1>View the api docs <a href="https://bk52izj9t0.apidog.io">Here</a></h1>`);
});


const start = async () => {
  try {
    await connectDb();
    await syncModels();


    app.use("/api/auth", authRouter);
    app.use("/api/blogs", blogRouter);
    app.use("/api/me", UserRouter)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();