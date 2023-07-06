import { Schema,model } from "mongoose";
import { Admin } from "../interface/interface";


const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')



const AdminSchema = new mongoose.Schema({
        user_name: {
          type: String,
          required: true,
          trim: true
        },
        password: {
          type: String,
          required: true,
          trim: true,
        },
        tokens: [{
          token: {
            type: String,
            required: true
          }
        }]
    }
    
);


// encrypt the user password before save to the database


// object method to generate user authentication token
AdminSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id}, "secretcode")
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

// static method for identify user by their email and password
AdminSchema.statics.findByCredentials = async (email:any, password:any) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new Error('Please enter authorized email address')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Password is not matched')
  }

  // const jwtToken = await jwt.sign({
  //   data: user.id
  // }, process.env.JWT_SECRET, { expiresIn: '1d' });

  // console.log(jwtToken);
  // user.token = jwtToken;
  return user
}

const User = mongoose.model('users', AdminSchema)

module.exports = User