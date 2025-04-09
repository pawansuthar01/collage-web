import { Schema, model } from "mongoose";
const EventModule = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Event = model("EventModule", EventModule);
export default Event;
