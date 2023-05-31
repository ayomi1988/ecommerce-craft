import { Schema,model } from "mongoose";
import { Product } from "../interface/interface";


const ProductSchema = new Schema<Product>(
    {
        product_name :{type:String,required:true},
        price:  { type: String, required: true },
        quantity:  { type: String, required: true },
        description:  { type: String, required: true },
    }
    
);

const Products = model<Product>('product',ProductSchema);

export { Products}