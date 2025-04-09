import Event from "../module/EventModule.js";
import AppError from "../Utils/AppErrors.js";

export const AddEvent = async (req, res, next) => {
  try {
    const { title, date, address } = req.body;

    if (!title || !date || !address) {
      return next(new AppError("All filed is required to Add Event", 400));
    }

    const NewEvent = new Event({
      date,
      title,
      address,
    });
    if (!NewEvent) {
      return next(new AppError("error to upload Event ...", 400));
    }
    await NewEvent.save();
    res.status(200).json({
      success: true,
      message: "successfully upload Event ",
      data: NewEvent,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const updatedEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("ID is required to update Event", 400));
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return next(
        new AppError("Something went wrong while updating Event cart", 400)
      );
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated Event cart",
      data: updatedEvent,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const AllEventGet = async (req, res, next) => {
  try {
    const AllEvent = await Event.find();
    const EventCount = await Event.countDocuments();
    res.status(200).json({
      success: true,
      message: "successfully Get All Event...",
      data: AllEvent,
      count: EventCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const DeleteEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("ID is required to Delete Event", 400));
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully Delete  Event...",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
