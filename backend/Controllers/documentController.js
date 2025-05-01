import Document from "../module/Documentmodule.js";
import AppError from "../Utils/AppErrors.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";
export const newDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError("select file to add document..", 400));
    }
    let url =
      "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
    if (req.file) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "document",
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
      const newDocument = new Document({
        url,
      });
      if (!newDocument) {
        return next(
          new AppError("something wont wrong to upload document..", 400)
        );
      }
      await newDocument.save();
      res.status(200).json({
        success: true,
        message: "successfully upload new Document...",
        data: newDocument,
      });
    }
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const DeleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Document ID is required for deletion.", 400));
    }

    const deletedDoc = await Document.findByIdAndDelete(id);

    if (!deletedDoc) {
      return next(new AppError("Document not found or already deleted.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getDocument = async (req, res, next) => {
  try {
    const document = await Document.find({});

    if (!document) {
      return next(new AppError("Something wont wrong to get document", 400));
    }
    res.status(200).json({
      success: true,
      message: "successfully add get document...",
      data: document,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
