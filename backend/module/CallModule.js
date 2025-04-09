import { model, Schema } from "mongoose";

const CallSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  message: { type: String, required: true },
  course_Interest: { type: String, required: true },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Call = model("Call", CallSchema);
export default Call;
