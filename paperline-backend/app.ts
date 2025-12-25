import express from "express";
import { connectDb } from "./config/db";
import { syncModels } from "./models";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { configDotenv } from "dotenv";
import { blogRouter } from "./routes/blog";
import { sendEmail } from "./config/email";

configDotenv();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://paperline-icechain.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);

//Database stuff
connectDb();
syncModels();

//Routing stuff
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(
    `<h1> View the api docs <a href="https://bk52izj9t0.apidog.io">Here</a>`
  );
});

//Send emails

// sendEmail()
