import courseApply from "../module/courseApply.js";
import AppError from "../Utils/AppErrors.js";
import sendEmail from "../Utils/EmailSender.js";

export const ApplyCourse = async (req, res, next) => {
  try {
    const {
      name,
      courseName,
      courseFees,
      message,
      previousEducation,
      phone,
      email,
    } = req.body;

    if (
      !name ||
      !courseName ||
      !email ||
      !message ||
      !courseFees ||
      !previousEducation ||
      !phone
    ) {
      return next(
        new AppError("All fields are required to apply for the course.", 400)
      );
    }

    const CourseApply = new courseApply({
      name,
      phone,
      email,
      courseFees,
      message,
      courseName,
      previousEducation,
    });

    await CourseApply.save();

    // ✅ Send response first
    res.status(200).json({
      success: true,
      message: "Successfully submitted course application.",
      data: CourseApply,
    });

    // ✅ Send email later (non-blocking)
    const subjectAdmin = "📩 New Message from User";
    const EmailMessageForAdmin = `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #007bff; text-align: center; margin-bottom: 20px;">📩 New Message from User</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
            <p><strong>👤 Sender Name:</strong> ${fullName}</p>
            <p><strong>📧 Sender Email:</strong> <a href="number:${number}" style="color: #007bff; text-decoration: none;">${email}</a></p>
            <p><strong>📌 Subject:</strong> ${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 16px; color: #333;">📝 <strong>Message:</strong></p>
          <p style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; font-size: 15px; line-height: 1.5; color: #555;">
            ${Previous_Education}
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 14px; color: #777;">📌 This message was sent from your website's contact form.</p>
          <p style="font-size: 14px; color: #555;">Best regards,</p>
          <p style="font-size: 16px; font-weight: bold; color: #007bff;">${fullName}</p>
        </div>
      `;

    sendEmail(process.env.EMAIL, subjectAdmin, EmailMessageForAdmin).catch(
      (error) => {
        console.error("Email sending failed:", error.message);
      }
    );
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const markToReadCourseApply = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      new AppError("id is required to mark as read...", 400);
    }
    const Course = await courseApply.findByIdAndUpdate(
      id,
      { read: true },
      { new: true, runValidators: true }
    );
    if (!Course) {
      new AppError("something wont wrong , tyr again sometime...", 400);
    }
    await Course.save();
    res.status(200).json({
      success: true,
      message: "successfully mark to read  Course...",
      data: Course,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};

export const getAllCourseApply = async (req, res, next) => {
  try {
    const CourseApply = await courseApply.find();
    const CourseApplyCount = await courseApply.countDocuments();
    res.status(200).json({
      success: true,
      message: "successfully get CourseApply...",
      data: CourseApply,
      count: CourseApplyCount,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};
