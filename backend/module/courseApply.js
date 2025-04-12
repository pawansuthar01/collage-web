import { model, Schema } from "mongoose";

const courseApplySchema = new Schema({
  name: { type: String, required: true },
  courseName: { type: String, required: true },
  email: { type: String, required: true },
  courseFees: { type: String, required: true },
  phone: { type: Number, required: true },
  previousEducation: { type: String, required: true },
  message: { type: String, required: true },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const courseApply = model("courseApply", courseApplySchema);
export default courseApply;
