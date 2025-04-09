import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);

const dataBaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Done TO connect");
  } catch (error) {
    process.exit(1);
  }
};
export default dataBaseConnection;
