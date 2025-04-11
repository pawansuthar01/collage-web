import Notice from "../module/NoticesModule.js";
import AppError from "../Utils/AppErrors.js";

export const AddNotice = async (req, res, next) => {
  try {
    const { notice_type, title, publish_date, expiry_date, message } = req.body;

    if (!title || !notice_type || !message || !publish_date || !expiry_date) {
      return next(new AppError("All filed is required to Add Education", 400));
    }

    const NewNotice = new Notice({
      notice_type,
      publish_date,
      expiry_date,
      title,
      message,
    });
    if (!NewNotice) {
      return next(new AppError("error to upload Notice cart...", 400));
    }
    await NewNotice.save();
    res.status(200).json({
      success: true,
      message: "successfully upload Notice cart",
      data: NewNotice,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const updatedNoticeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("ID is required to update education", 400));
    }

    const updatedNotice = await Notice.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNotice) {
      return next(
        new AppError("Something went wrong while updating notice cart", 400)
      );
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated notice cart",
      data: updatedNotice,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const AllNoticeGet = async (req, res, next) => {
  try {
    const AllNotice = await Notice.find();
    const NoticeCount = await Notice.countDocuments();
    res.status(200).json({
      success: true,
      message: "successfully Get All Notices...",
      data: AllNotice,
      count: NoticeCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const DeleteNoticeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("ID is required to Delete notice", 400));
    }
    await Notice.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully Delete  Notice...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
