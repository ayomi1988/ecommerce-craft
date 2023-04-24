import express, { Express, Request, Response } from "express";
import { connectMongoDB } from "./config/connection";
import customerRote from "./route/customer.route";
import orderRote from "./route/order.route";
import productRote from "./route/product.route";
import adminRote from "./route/admin.route";
import cors from "cors";


const app = express();


connectMongoDB();

app.use(cors());
app.use(express.json());
app.use("/crafts/customers", customerRote);
app.use("/crafts/orders", orderRote);
app.use("/crafts/products", productRote);
app.use("/crafts/admin", adminRote);

export { app };