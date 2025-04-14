import { model, Schema } from "mongoose";
const AboutModule = new Schema(
  {
    photo: { type: String, required: true },
    Key_id: { type: String, default: "About_image", unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
const About = model("About", AboutModule);
export default About;
