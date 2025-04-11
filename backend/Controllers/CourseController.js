import cloudinary from "cloudinary";
import fs from "fs/promises";
import Course from "../module/CourseModule.js";
import AppError from "../Utils/AppErrors.js";
import mongoose from "mongoose";
export const AddCourse = async (req, res, next) => {
  try {
    const { name, year, seats, fees, description } = req.body;

    if (!name || !description || !year || !seats || !fees || !req.file) {
      return next(new AppError("All filed is required to Add Course", 400));
    }

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
    const NewCourse = new Course({
      name_course: name,
      course_description: description,
      course_dur: year,
      course_fees: fees,
      course_seats: seats,
      photo: photo,
    });
    if (!NewCourse) {
      return next(new AppError("error to upload course cart...", 400));
    }
    await NewCourse.save();
    res.status(200).json({
      success: true,
      message: "successfully upload course cart",
      data: NewCourse,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const updatedCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    console.log(req.file);
    const { name, year, seats, fees, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid Course ID", 400));
    }

    let photo =
      "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
    if (req.file) {
      console.log(req.file);
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "CourseImage",
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
      ...(name && { name_course: name }),
      ...(year && { course_dur: year }),
      ...(fees && { course_fees: fees }),
      ...(seats && { course_seats: seats }),

      ...(description && { course_description: description }),
      ...(req.file && { photo }),
    };
    const updateCourseCart = await Course.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updateCourseCart) {
      return next(
        new AppError("Something went wrong while updating Course cart", 400)
      );
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated Course cart",
      data: updateCourseCart,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const AllCourseGet = async (req, res, next) => {
  try {
    const allCourse = await Course.find();
    const CourseCount = await Course.countDocuments();
    res.status(200).json({
      success: true,
      message: "successfully Get All Course...",
      data: allCourse,
      count: CourseCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const DeleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("ID is required to Delete education", 400));
    }
    await Course.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully Delete  course...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const GetCourse = async (req, res, next) => {
  try {
    const course = await Course.find();
    const courseCount = await Course.countDocuments();
    res.status(200).json({
      success: true,

      data: course,
      count: courseCount,

      message: "successfully course get",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
