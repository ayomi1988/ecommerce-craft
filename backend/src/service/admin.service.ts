const User = require('../model/admin.model')
import { log } from "../logs/logger";
import { Admin } from "../interface/interface";
const md5 = require('md5');
const jwt = require('jsonwebtoken')

/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteAdmin = async (id: string) => {
  try {
    const deletedAdmin = await User.deleteOne({ _id: id });
    if (deletedAdmin.deletedCount == 0) {
      throw new Error("Could not find");
    }
  } catch (e) {
    log.info(e);
  }
};

/**
 * Return all items from DB
 * @returns
 */
const getAllAdmins = async () => {
  try {
    //console.log("xxx");
    return await User.find();
  } catch (e) {
    log.info(e);
  }
};

/**
 * Get item from DB by ID
 * @param string id
 * @returns
 */
const getAdminByID = async (id: string) => {
  try {
    const singleAdmin = await User.findById(id).exec();
    if (!singleAdmin) {
      throw Error;
    }
    const { _id, user_name, password } =
      singleAdmin;
    return {
      id: _id,
      user_name: user_name,
      password: password
    };
  } catch (e) {
    log.info(e);
  }
};

const adminUserLogin = async (value: { user_name: any; password: any; }) => {
  try {
    const { user_name, password } = value;
    const singleAdmin = await User.findOne({ "user_name": user_name, "password": md5(password) } ).exec();
    if (!singleAdmin) {
      throw Error;
    }else{

      //console.log({singleAdmin});

      const { _id,  user_name} =
        singleAdmin;

        const jwtToken = await jwt.sign({
          data: _id
        }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
        console.log(jwtToken);
        // user.token = jwtToken;

      return {
        id: _id,
        user_name: user_name,
        token: jwtToken
  
      };

    }

  } catch (e) {
    throw Error;
    log.info(e);
  }
};


/**
 * Create item in DB
 * @param object value
 * @returns
 */
const createAdmin = async (value: Admin) => {
  const { user_name, password } = value;

  try {
    const newAdmin = new User({
      user_name: user_name,
      password: md5(password)
    });

    return await newAdmin.save();
  } catch (e) {
    log.info(e);
  }
};

/**
 * Update a entry in DB by ID
 * @param string value
 * @param id
 */
const updateAdminData = async (value: Admin, id: string) => {
  const { user_name, password } = value;
  try {

    User.findByIdAndUpdate(
      id,
      {
        user_name: user_name,
        password: password
      },
      function (err:any, docs:any) {
        if (err) {
          throw err;
        } else {
          //console.log("Updated User : ", docs);
        }
      }
    );







  } catch (e) {
    log.info(e);
  }
};



export {
  deleteAdmin,
  getAllAdmins,
  getAdminByID,
  createAdmin,
  updateAdminData,
  adminUserLogin
 
};
