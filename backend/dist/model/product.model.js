import { Schema, model } from "mongoose";
const ProductSchema = new Schema({
    product_name: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    description: { type: String, required: true },
});
const Products = model('product', ProductSchema);
export { Products };
