import { Schema, model } from "mongoose";
const FeedbackModule = new Schema({
  giveFeedback: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },

  rating: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = model("Feedback", FeedbackModule);
export default Feedback;
