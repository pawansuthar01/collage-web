import { Schema, model } from "mongoose";
const BannerNoticeModule = new Schema({
  notice: { type: String, required: true },
});

const BannerNotice = model("Banner-notice", BannerNoticeModule);
export default BannerNotice;
