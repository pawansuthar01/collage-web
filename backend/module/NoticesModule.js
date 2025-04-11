import { Schema, model } from "mongoose";
const NoticesModule = new Schema({
  notice_type: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },

  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  publish_date: { type: String, required: true },
  expiry_date: { type: String, required: true },
});

const Notice = model("Notice", NoticesModule);
export default Notice;
