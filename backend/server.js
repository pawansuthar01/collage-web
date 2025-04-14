import { config } from "dotenv";
config();
console.log(config());
import app from "./app.js";
import cloudinaryPkg from "cloudinary";
const { v2: cloudinary } = cloudinaryPkg;
const PORT = process.env.PORT || 5003;
console.log(PORT);

export default cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
