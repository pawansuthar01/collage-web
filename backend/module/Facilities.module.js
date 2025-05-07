import { Schema, model } from "mongoose";
const FacilitiesModule = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  caption: { type: String, required: true },
});

const Facilities = model("Facilities", FacilitiesModule);
export default Facilities;
