import { Schema, model } from "mongoose";
const documentModule = new Schema({
  url: { type: String, required: true },
});

const Document = model("document", documentModule);
export default Document;
