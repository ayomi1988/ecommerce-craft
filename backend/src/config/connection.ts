import mongoose from "mongoose";
import { log } from "../logs/logger";
import { config } from "./config";

const connectMongoDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(`${config.mongoDB.URL}`, {
      retryWrites: true,
    });
    log.info("DB is connected");
  } catch (error) {
    log.info(error);
  }
};

export { connectMongoDB };
