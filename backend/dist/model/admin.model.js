import { Schema, model } from "mongoose";
import validator from 'validator';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminSchema = new Schema({
    first_name: { type: String, required: true },
    user_name: { type: String, required: true },
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
    password: {
        type: String,
        required: true,
        trim: true,
    }
});
const Admins = model('admin', AdminSchema);
export { Admins };
