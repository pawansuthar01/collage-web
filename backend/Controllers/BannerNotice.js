import BannerNotice from "../module/BannerNotice.js";
import AppError from "../Utils/AppErrors.js";

export const newNotice = async (req, res, next) => {
  try {
    const { notice } = req.body;
    if (!notice) {
      return next(new AppError("notice is required to new Notice", 400));
    }
    const NewNotice = new BannerNotice({
      notice: notice,
    });
    if (!NewNotice) {
      return next(new AppError("Something wont wrong to add notice", 400));
    }
    await NewNotice.save();
    res.status(200).json({
      success: true,
      message: "successfully add new Notice...",
      data: NewNotice,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const editNotice = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError(" edit notice to required id ", 400));
    }
    const { notice } = req.body;
    if (!notice) {
      return next(new AppError("notice is required to update Notice", 400));
    }
    const UpdateNotice = await BannerNotice.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!UpdateNotice) {
      return next(new AppError("Something wont wrong to Update notice", 400));
    }
    await UpdateNotice.save();
    res.status(200).json({
      success: true,
      message: "successfully add Update Notice...",
      data: UpdateNotice,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const DeleteNotice = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError(" Delete notice to required id ", 400));
    }

    const DeleteNotice = await BannerNotice.findByIdAndDelete(id);
    if (!DeleteNotice) {
      return next(new AppError("Something wont wrong to Delete notice", 400));
    }
    res.status(200).json({
      success: true,
      message: "successfully add Delete Notice...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const getBannerNotice = async (req, res, next) => {
  try {
    const bannerNotice = await BannerNotice.find({});
    if (!bannerNotice) {
      return next(new AppError("Something wont wrong to get notice", 400));
    }

    res.status(200).json({
      success: true,
      message: "successfully add get Notice...",
      data: bannerNotice,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
