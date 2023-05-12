var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { log } from "../logs/logger";
import { config } from "./config";
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose.set("strictQuery", true);
        yield mongoose.connect(`${config.mongoDB.URL}`, {
            retryWrites: true,
        });
        log.info("DB is connected");
    }
    catch (error) {
        log.info(error);
    }
});
export { connectMongoDB };
