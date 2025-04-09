import { model, Schema } from "mongoose";
const mainSection = new Schema(
  {
    totalStudentCount: { type: Number, default: 50 },
    totalCourseCount: { type: Number, default: 4 },
    totalAwardsCount: { type: Number, default: 50 },
    Years_of_Excellence_count: { type: Number, default: 50 },
    photo: { type: String, required: true },
    Key_id: { type: String, default: "INFO_Banner", unique: true },
  },
  { timestamps: true }
);
const Main = model("main", mainSection);
export default Main;
