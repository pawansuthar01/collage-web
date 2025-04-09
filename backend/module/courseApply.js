import { model, Schema } from "mongoose";

const courseApplySchema = new Schema({
  fullName: { type: String, required: true },
  courseName: { type: String, required: true },
  number: { type: Number, required: true },

  Previous_Education: { type: String, required: true },
  message: { type: String, required: true },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const courseApply = model("courseApply", courseApplySchema);
export default courseApply;
