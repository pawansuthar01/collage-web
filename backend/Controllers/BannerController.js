import AppError from "../Utils/AppErrors.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

import Main from "../module/BannerModule.js";

//* uploadMainSectionDetails//*
export const BannerDetailsCreate = async (req, res, next) => {
  const {
    totalCourseCount,
    totalStudentCount,
    totalAwardsCount,
    Years_of_Excellence_count,
  } = req.body;
  if (
    !totalCourseCount ||
    !totalStudentCount ||
    !totalAwardsCount ||
    !req.file ||
    !Years_of_Excellence_count
  ) {
    return next(new AppError("please give All Data  ", 400));
  }
  let photo =
    "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";

  try {
    // *cloudinary setup //*
    if (req.file) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "mainPhoto",
          }
        );
        if (uploadedPhoto) {
          photo = uploadedPhoto.secure_url;
        }
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }
    const CreateMain = new Main({
      totalCourseCount,
      totalStudentCount,
      totalAwardsCount,

      Years_of_Excellence_count,
      photo,
    });
    if (!CreateMain) {
      return next(new AppError("SomeThing Wont wrong...", 400));
    }
    await CreateMain.save();
    res.status(200).json({
      success: true,
      message: "Successfully upload data....",
      data: CreateMain,
    });
  } catch (error) {
    if (req.file?.path) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};

//*updated main section data//*
export const UpdatedMainSectionData = async (req, res, next) => {
  const {
    totalCourseCount,
    totalStudentCount,
    totalAwardsCount,
    Years_of_Excellence_count,
  } = req.body;
  console.log(req.body);
  try {
    // *cloudinary setup //*

    let photo =
      "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
    if (req.file) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "mainPhoto",
          }
        );
        if (uploadedPhoto) {
          photo = uploadedPhoto.secure_url;
        }
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }
    const updatedData = {
      ...(totalCourseCount && { totalCourseCount }),
      ...(totalStudentCount && { totalStudentCount }),
      ...(Years_of_Excellence_count && { Years_of_Excellence_count }),
      ...(totalAwardsCount && { totalAwardsCount }),
      ...(req.file && { photo }),
    };

    const updatedMainSection = await Main.findOneAndUpdate(
      { Key_id: "INFO_Banner" },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    await updatedMainSection.save();
    if (!updatedMainSection) {
      return next(new AppError("SomeThing Wont wrong...", 400));
    }

    res.status(200).json({
      success: true,
      message: "Successfully update data....",
      data: updatedMainSection,
    });
  } catch (error) {
    if (req.file?.path) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};

export const GetBanner = async (req, res, next) => {
  try {
    const bannerData = await Main.findOne({ Key_id: "INFO_Banner" });
    res.status(200).json({
      success: true,

      data: [bannerData],

      message: "successfully bannerData get",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
