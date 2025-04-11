import { Router } from "express";
import { GetSocial } from "../Controllers/SociolController.js";
import { GetBanner } from "../Controllers/BannerController.js";
import { GetAbout } from "../Controllers/AboutController.js";
import {
  addFeedback,
  getAllFeedback,
} from "../Controllers/FeedbackController.js";
import { AllNoticeGet } from "../Controllers/NoticesController.js";
import { GetCourse } from "../Controllers/CourseController.js";
import { submitMessage } from "../Controllers/MessageController.js";
import { ApplyCourse } from "../Controllers/courseApplycontroller.js";

const UserRouter = Router();
UserRouter.route("/sociallink").get(GetSocial);
UserRouter.route("/banner").get(GetBanner);
UserRouter.route("/about").get(GetAbout);
UserRouter.route("/feedback").get(getAllFeedback).post(addFeedback);
UserRouter.route("/message").post(submitMessage);
UserRouter.route("/course").get(GetCourse);
UserRouter.route("/notice").get(AllNoticeGet);
UserRouter.route("/course_apply").post(ApplyCourse);
export default UserRouter;
