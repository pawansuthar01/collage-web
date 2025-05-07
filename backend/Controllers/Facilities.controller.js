import AppError from "../Utils/AppErrors.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";
import Facilities from "../module/Facilities.module.js";
export const newFacilities = async (req, res, next) => {
  try {
    const { title, caption } = req.body;
    if (!req.file || !title || !caption) {
      return next(new AppError("select file to add document..", 400));
    }
    let url =
      "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
    if (req.file) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "facilities",
          }
        );
        if (uploadedPhoto) {
          url = uploadedPhoto.secure_url;
        }
        await fs.rm(req.file.path, { force: true });
      } catch (error) {
        await fs.rm(req.file.path, { force: true });
        return next(new AppError(error.message, 400));
      }
      const NewFacilities = new Facilities({
        url,
        title,
        caption,
      });
      if (!NewFacilities) {
        return next(
          new AppError("something wont wrong to upload Facilities..", 400)
        );
      }
      await NewFacilities.save();
      res.status(200).json({
        success: true,
        message: "successfully upload new Facilities...",
        data: NewFacilities,
      });
    }
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const DeleteFacilities = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Facilities ID is required for deletion.", 400));
    }

    const deletedFac = await Facilities.findByIdAndDelete(id);

    if (!deletedFac) {
      return next(
        new AppError("Facilities not found or already deleted.", 404)
      );
    }

    res.status(200).json({
      success: true,
      message: "Facilities deleted successfully.",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facilities.find({});

    if (!facilities) {
      return next(new AppError("Something wont wrong to get facilities", 400));
    }
    res.status(200).json({
      success: true,
      message: "successfully add get facilities...",
      data: facilities,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
