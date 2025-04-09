import Feedback from "../module/feedbackModule.js";
import AppError from "../Utils/AppErrors.js";

export const addFeedback = async (req, res, next) => {
  try {
    const { rating, message, name, giveFeedback } = req.body;
    if ((!rating || !message || !name, !email)) {
      return next(new AppError("please give ratting and comment...", 400));
    }
    const feedback = new Feedback({
      giveFeedback,

      name,
      message,

      rating,
    });
    if (!feedback) {
      return next(new AppError("something wont wrong , try next time...", 400));
    }
    await feedback.save();
    res.status(200).json({
      success: true,
      message: "successfully submit feedback...",
      data: feedback,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const deleteFeedbackById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("please give id for update feedback...", 400));
    }
    await Feedback.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "successfully delete feedback...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const getAllFeedback = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const feedbackData = await Feedback.find({})
      .skip(skip)
      .limit(parseInt(limit));
    const countFeedback = await Feedback.countDocuments({});
    if (!feedbackData) {
      return next(
        new AppError("something went wrong , please tyr Again  ", 400)
      );
    }
    res.status(200).json({
      success: true,
      message: "successfully get feedback...",
      data: feedbackData,
      totalPage: Math.ceil(countFeedback / limit),
      countFeedback,
      currentPage: page,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
