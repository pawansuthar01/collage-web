import Feedback from "../module/feedbackModule.js";
import AppError from "../Utils/AppErrors.js";

export const addFeedback = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      rating,
      feedback: message,
      name,
      feedbackType: giveFeedback,
    } = req.body;
    if (!rating || !message || !name || !giveFeedback) {
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
    const { page = 1, limit = 0 } = req.query;
    const skip = (page - 1) * limit;

    // Filter feedback with ratings between 3 and 5
    const bastFeedback = await Feedback.find({
      rating: { $gte: 3, $lte: 5 }, // Rating between 3 and 5
    })
      .skip(skip)
      .limit(parseInt(6));

    const AllFeedback = await Feedback.find({});

    if (!AllFeedback || AllFeedback.length === 0) {
      return next(
        new AppError("No feedback found with ratings between 3 and 5", 404)
      );
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched feedback with ratings between 3 and 5",
      data: {
        bast: bastFeedback,
        allFeedback: AllFeedback,
      },
    });
  } catch (error) {
    return next(new AppError(error.message || "Internal Server Error", 500));
  }
};
