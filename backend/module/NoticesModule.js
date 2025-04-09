import { Schema, model } from "mongoose";
const NoticesModule = new Schema({
  NoticeType: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },

  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Notice = model("Notice", NoticesModule);
export default Notice;
