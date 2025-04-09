import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },

  message: { type: String, required: true },
  subject: { type: String, required: true },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Message = model("Message", MessageSchema);
export default Message;
