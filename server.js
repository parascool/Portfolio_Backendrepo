import app from './app.js';
import cloudinary from 'cloudinary';
import { config } from "dotenv";

config({ path: "./.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listining on port no :- ${process.env.PORT}`);
})