import { model, Schema } from "mongoose";
const CourseModule = new Schema(
  {
    name_course: { type: String, required: true },
    course_description: { type: String, required: true },
    course_dur: { type: String, required: true },
    course_fees: { type: Number, required: true },
    course_seats: { type: Number, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);
const Course = model("Course", CourseModule);
export default Course;
