import { Schema,model } from "mongoose";
import { Customer } from "../interface/interface";
import validator from 'validator';

const CustomerSchema = new Schema<Customer>(
    {
        first_name :{type:String,required:true},
        last_name: { type: String, required: true },
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
          password: {
            type: String,
            required: true,
            trim: true,
          },
    }
    
);

const Customers = model<Customer>('Customer',CustomerSchema);

export { Customers}