import cloudinary from "cloudinary";
import fs from "fs/promises";
import About from "../module/Aboutmodule.js";
import AppError from "../Utils/AppErrors.js";

//* uploadAboutSectionDetails//*
export const AboutSectionCreate = async (req, res, next) => {
  if (!req.file) {
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
            folder: "AboutPhoto",
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
    const CreateAbout = new About({
      photo,
    });
    if (!CreateAbout) {
      return next(new AppError("SomeThing Wont wrong...", 400));
    }
    await CreateAbout.save();
    res.status(200).json({
      success: true,
      message: "Successfully upload data....",
      data: CreateAbout,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};

//*updated main section data//*
export const AboutSectionUpdate = async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("please give All Data  ", 400));
  }

  try {
    // *cloudinary setup //*

    let photo =
      "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
    if (req.file) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "AboutPhoto",
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
      ...(req.file && { photo }),
    };
    const updatedAboutSection = await About.findOneAndUpdate(
      { Key_id: "About_image" },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAboutSection) {
      return next(new AppError("SomeThing Wont wrong...", 400));
    }

    res.status(200).json({
      success: true,
      message: "Successfully update data....",
      data: updatedAboutSection,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const GetAbout = async (req, res, next) => {
  try {
    const aboutData = await About.find();
    res.status(200).json({
      success: true,

      data: aboutData,

      message: "successfully data get",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
