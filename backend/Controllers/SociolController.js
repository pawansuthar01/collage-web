import SocialLink from "../module/InfoModule.js";
import AppError from "../Utils/AppErrors.js";

export const SubmitSociolLink = async (req, res, next) => {
  try {
    const {
      phoneNumber,
      address,
      grievanceOfficerEmail,
      grievanceOfficerName,
      grievanceOfficerNumber,
      email,
      instagram,
      facebook,
      youtube,
    } = req.body;

    const SociolLink = new SocialLink({
      phoneNumber,
      facebook,
      email,
      grievanceOfficerEmail,
      grievanceOfficerName,
      grievanceOfficerNumber,
      youtube,
      instagram,
      address,
    });
    if (!SociolLink) {
      return next(new AppError("something wont wrong,try next time...", 400));
    }
    await SociolLink.save();
    res.status(200).json({
      success: true,
      message: "details submit successfully",
      data: SociolLink,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const updateSociolLink = async (req, res, next) => {
  try {
    const SociolLink = await SocialLink.findOneAndUpdate(
      { uniqueKey: "INFORMATION" },
      req.body,
      { new: true, runValidators: true }
    );

    if (!SociolLink) {
      return next(new AppError("something wont wrong,try next time...", 400));
    }
    await SociolLink.save();
    res.status(200).json({
      success: true,
      message: "social Link update successfully",
      data: SociolLink,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const GetSocial = async (req, res, next) => {
  try {
    const SocialLinkData = await SocialLink.find();
    res.status(200).json({
      success: true,

      data: SocialLinkData,

      message: "successfully SocialLinkData get",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
