import { Schema,model } from "mongoose";
import { Admin } from "../interface/interface";
import validator from 'validator';

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const AdminSchema = new Schema<Admin>(
    {
        first_name :{type:String,required:true},
        user_name: { type: String, required: true },
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
          }
    }
    
);

const Admins = model<Admin>('admin',AdminSchema);

export { Admins}