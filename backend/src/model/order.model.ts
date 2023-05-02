import { Schema,model } from "mongoose";
import { Order } from "../interface/interface";
import validator from 'validator';

const OrderSchema = new Schema<Order>(
    {
        order_number :{type:String,required:true},
        first_name :{type:String,required:true},
        price:  { type: String, required: true },
        product_name:  { type: String, required: true },
        quantity:  { type: String, required: true },
        total:  { type: String, required: true },    
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            validate: {
              validator: (value: string) => validator.isEmail(value),
              message: () => 'Email is not valid',
            },
        },
    }
    
);

const Orders = model<Order>('order',OrderSchema);

export { Orders}