import Message from "../module/massageModule.js";
import AppError from "../Utils/AppErrors.js";
import sendEmail from "../Utils/EmailSender.js";
import { config } from "dotenv";
config();

export const submitMessage = async (req, res, next) => {
  try {
    const { name, message, phoneNumber, email } = req.body;

    if (!name || !message || !phoneNumber || !email) {
      return next(
        new AppError("All filed is required to submitMessage...", 400)
      );
    }
    const SubmitMessage = new Message({
      name,
      phoneNumber,
      email,
      message,
    });
    if (!SubmitMessage) {
      return next(
        new AppError("something wont wrong , tyr again sometime...", 400)
      );
    }
    await SubmitMessage.save();
    res.status(200).json({
      success: true,
      message: "successfully submit message...",
      data: SubmitMessage,
    });

    (async () => {
      try {
        const subjectAdmin = "📩 New Message from User";
        const EmailMessageForAdmin = `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
          
          <h2 style="color: #007bff; text-align: center; margin-bottom: 20px;">📩 New Message from User</h2>
      
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
            <p><strong>👤 Sender Name:</strong> ${name}</p>
            <p><strong>📧 Sender Email:</strong> <a href="number:${phoneNumber}" style="color: #007bff; text-decoration: none;">${email}</a></p>
            <p><strong>📌 Subject:</strong> ${message}</p>
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
        console.log("✅ Email sent successfully.");
      } catch (emailError) {
        console.error("❌ Error sending email:", emailError.message);
      }
    })();
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};
export const markToReadMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      new AppError("id is required to mark as read...", 400);
    }
    const message = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true, runValidators: true }
    );
    if (!message) {
      new AppError("something wont wrong , tyr again sometime...", 400);
    }
    await message.save();
    res.status(200).json({
      success: true,
      message: "successfully mark to read  message...",
      data: message,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};

export const getAllMessage = async (req, res, next) => {
  try {
    const messages = await Message.find();
    const messagesCount = await Message.countDocuments();
    res.status(200).json({
      success: true,
      message: "successfully get message...",
      data: messages,
      count: messagesCount,
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
};
