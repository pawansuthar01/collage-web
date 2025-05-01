import { model, Schema } from "mongoose";

const InformationSchema = new Schema(
  {
    uniqueKey: { type: String, default: "INFORMATION", unique: true },
    phoneNumber: { type: Number, required: true },

    email: { type: String, required: true },
    instagram: { type: String },
    facebook: { type: String },
    youtube: { type: String },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const SocialLink = model("Info", InformationSchema);

export default SocialLink;
