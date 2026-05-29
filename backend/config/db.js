import { connect } from "mongoose";
import envs from "./vars.js";

const connectDB = async () => {
  try {
    await connect(envs.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
};

export default connectDB;