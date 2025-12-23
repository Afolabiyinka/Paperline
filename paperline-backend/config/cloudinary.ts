import { v2 as cloudinary } from "cloudinary";

const api_key = process.env.API_KEY!;
const api_secret = process.env.API_SECRET!;
const cloud_name = process.env.CLOUD_NAME!;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
  secure: true,
});

export default cloudinary;