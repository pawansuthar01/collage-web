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
import { SubmitCallRequired } from "../Controllers/CallController.js";
import { getBannerNotice } from "../Controllers/BannerNotice.js";
import { getDocument } from "../Controllers/documentController.js";
import { getFacilities } from "../Controllers/Facilities.controller.js";

const UserRouter = Router();
UserRouter.route("/sociallink").get(GetSocial);
UserRouter.route("/banner").get(GetBanner);
UserRouter.route("/about").get(GetAbout);
UserRouter.route("/feedback").get(getAllFeedback).post(addFeedback);
UserRouter.route("/message").post(submitMessage);
UserRouter.route("/Call").post(SubmitCallRequired);
UserRouter.route("/course").get(GetCourse);
UserRouter.route("/notice").get(AllNoticeGet);
UserRouter.route("/course_apply").post(ApplyCourse);
UserRouter.route("/bannernotice").get(getBannerNotice);
UserRouter.route("/document").get(getDocument);
UserRouter.route("/facilities").get(getFacilities);
export default UserRouter;
