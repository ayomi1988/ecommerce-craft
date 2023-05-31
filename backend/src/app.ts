import express from "express";
import { connectMongoDB } from "./config/connection";
import customerRote from "./route/customer.route";
import orderRote from "./route/order.route";
import productRote from "./route/product.route";
import adminRote from "./route/admin.route";
import adminLoginRote from "./route/adminlogin.route";
import frontendLoginRote from "./route/customer.route";
import cors from "cors";


const app = express();


connectMongoDB();

app.use(cors());
app.use(express.json());
app.use("/crafts/customers", customerRote);
app.use("/crafts/orders", orderRote);
app.use("/crafts/products", productRote);
app.use("/crafts/admin", adminRote);
app.use("/admin/login", adminLoginRote);
app.use("/crafts/login", frontendLoginRote);

export { app };