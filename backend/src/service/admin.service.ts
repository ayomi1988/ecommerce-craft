import { Admins } from "../model/admin.model";
import { log } from "../logs/logger";
import { Admin } from "../interface/interface";
import { isEmpty } from "cypress/types/lodash";
var md5 = require('md5');

/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteAdmin = async (id: string) => {
  try {
    const deletedAdmin = await Admins.deleteOne({ _id: id });
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
    console.log("xxx");
    return await Admins.find();
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
    const singleAdmin = await Admins.findById(id).exec();
    if (!singleAdmin) {
      throw Error;
    }
    const { _id, first_name, user_name, email, password } =
      singleAdmin;
    return {
      id: _id,
      first_name: first_name,
      user_name: user_name,
      email: email,
      password: password
    };
  } catch (e) {
    log.info(e);
  }
};

const adminUserLogin = async (value: { user_name: any; password: any; }) => {
  try {
    const { user_name, password } = value;
    const singleAdmin = await Admins.findOne({ "user_name": user_name, "password": md5(password) } ).exec();
    if (!singleAdmin) {
      throw Error;
    }else{

      console.log({singleAdmin});

      const { _id, first_name, email } =
        singleAdmin;
      return {
        id: _id,
        first_name: first_name,
        user_name: user_name,
        email: email,
  
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
  const { first_name, user_name, email, password } = value;

  try {
    const newAdmin = new Admins({
      first_name: first_name,
      user_name: user_name,
      email: email,
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
  const { first_name, user_name, email, password } = value;
  try {

    Admins.findByIdAndUpdate(
      id,
      {
        first_name: first_name,
        user_name: user_name,
        email: email,
        password: password
      },
      function (err, docs) {
        if (err) {
          throw err;
        } else {
          console.log("Updated User : ", docs);
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
