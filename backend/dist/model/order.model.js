import { Schema, model } from "mongoose";
import validator from 'validator';
const OrderSchema = new Schema({
    order_number: { type: String, required: true },
    first_name: { type: String, required: true },
    price: { type: String, required: true },
    product_name: { type: String, required: true },
    quantity: { type: String, required: true },
    total: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: () => 'Email is not valid',
        },
    },
});
const Orders = model('order', OrderSchema);
export { Orders };
