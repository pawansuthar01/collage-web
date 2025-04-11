import { Router } from "express";
import {
  AdminCheck,
  changePassword,
  checkPasswordResetToken,
  updatePassword,
} from "../Controllers/AdminController.js";
import {
  getAllCourseApply,
  markToReadCourseApply,
} from "../Controllers/courseApplycontroller.js";
import {
  AddCourse,
  DeleteCourseById,
  updatedCourseById,
} from "../Controllers/CourseController.js";
import {
  AddNotice,
  DeleteNoticeById,
  updatedNoticeById,
} from "../Controllers/NoticesController.js";

import {
  BannerDetailsCreate,
  UpdatedMainSectionData,
} from "../Controllers/BannerController.js";
import {
  deleteFeedbackById,
  getAllFeedback,
} from "../Controllers/FeedbackController.js";
import {
  getAllCalls,
  markToReadCallRequired,
} from "../Controllers/CallController.js";
import {
  getAllMessage,
  markToReadMessage,
} from "../Controllers/MessageController.js";
import {
  GetSocial,
  SubmitSociolLink,
  updateSociolLink,
} from "../Controllers/SociolController.js";
import upload from "../Middleware/multerMiddleware.js";
import {
  AboutSectionCreate,
  AboutSectionUpdate,
} from "../Controllers/AboutController.js";

const Admin = Router();
Admin.get("/Login/:email/:password", AdminCheck);

Admin.get("/checkPasswordReset/:resetToken", checkPasswordResetToken);
Admin.put("/change/Password/:resetToken", changePassword);
Admin.put("/update/password", updatePassword);
Admin.route("/course").post(upload.single("photo"), AddCourse);
Admin.route("/course/:id")
  .put(upload.single("photo"), updatedCourseById)
  .delete(DeleteCourseById);
Admin.route("/Banner")
  .post(upload.single("photo"), BannerDetailsCreate)
  .put(upload.single("photo"), UpdatedMainSectionData);

Admin.route("/notice").post(AddNotice);
Admin.route("/notice/:id").put(updatedNoticeById).delete(DeleteNoticeById);

Admin.route("/feedback").get(getAllFeedback).delete(deleteFeedbackById);
Admin.route("/call").get(getAllCalls).put(markToReadCallRequired);
Admin.route("/message").put(markToReadMessage).get(getAllMessage);
Admin.route("/Sociol")
  .put(updateSociolLink)
  .post(SubmitSociolLink)
  .get(GetSocial);
Admin.route("/about")
  .post(upload.single("photo"), AboutSectionCreate)
  .put(upload.single("photo"), AboutSectionUpdate);
Admin.route("/course")
  .post(upload.single("photo"), AddCourse)
  .put(upload.single("photo"), updatedCourseById)
  .delete(DeleteCourseById);
Admin.route("/courseApply").get(getAllCourseApply);
Admin.route("/courseApply/:id").put(markToReadCourseApply);

export default Admin;
