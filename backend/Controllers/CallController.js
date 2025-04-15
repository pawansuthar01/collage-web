import Call from "../module/CallModule.js";
import AppError from "../Utils/AppErrors.js";
import sendEmail from "../Utils/EmailSender.js";

export const SubmitCallRequired = async (req, res, next) => {
  try {
    const { name, message, course: course_Interest, phone: number } = req.body;
    if (!name || !message || !course_Interest || !number) {
      return next(
        new AppError("All filed is required to submitMessage...", 400)
      );
    }

    const CallRequired = new Call({
      name,
      number,
      course_Interest,
      message,
    });
    if (!CallRequired) {
      return next(
        new AppError("something wont wrong , tyr again sometime...", 400)
      );
    }
    await CallRequired.save();

    res.status(200).json({
      success: true,
      message: "successfully submit call required...",
      data: CallRequired,
    });
    (async () => {
      try {
        const subjectAdmin = "📩 New Message from User";
        const EmailMessageForAdmin = `
<div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
  
  <h2 style="color: #007bff; text-align: center; margin-bottom: 20px;">📩 New Message from User</h2>

  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
    <p><strong>👤 Sender Name:</strong> ${name}</p>
    <p><strong>📧 Sender Email:</strong> <a href="number:${number}" style="color: #007bff; text-decoration: none;">${number}</a></p>
    <p><strong>📌 course_Interest:</strong> ${course_Interest}</p>
  </div>

  <p style="margin-top: 20px; font-size: 16px; color: #333;">📝 <strong>Message:</strong></p>
  <p style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; font-size: 15px; line-height: 1.5; color: #555;">
    ${message}
  </p>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

  <p style="font-size: 14px; color: #777;">📌 This message was sent from your website's contact form.</p>

  <p style="font-size: 14px; color: #555;">Best regards,</p>
  <p style="font-size: 16px; font-weight: bold; color: #007bff;">${name}</p>

</div>
`;

        await sendEmail(process.env.EMAIL, subjectAdmin, EmailMessageForAdmin);
      } catch (error) {
        return next(new AppError(error.message), 400);
      }
    })();
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};
export const markToReadCallRequired = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      new AppError("id is required to mark as read...", 400);
    }
    const call = await Call.findByIdAndUpdate(
      id,
      { read: true },
      { new: true, runValidators: true }
    );
    if (!call) {
      new AppError("something wont wrong , tyr again sometime...", 400);
    }
    await call.save();
    res.status(200).json({
      success: true,
      message: "successfully mark to read  call...",
      data: call,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};

export const getAllCalls = async (req, res, next) => {
  try {
    const calls = await Call.find();
    const callCount = await Call.countDocuments();
    res.status(200).json({
      success: true,
      message: "successfully get call...",
      data: calls,
      count: callCount,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};
