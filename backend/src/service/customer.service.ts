import { Customers } from "../model/customer.model";
import { log } from "../logs/logger";
import { Customer } from "../interface/interface";
var md5 = require('md5');

/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteCustomer = async (id: string) => {
  try {
    const deletedCustomer = await Customers.deleteOne({ _id: id });
    if (deletedCustomer.deletedCount == 0) {
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
const getAllCustomers = async () => {
  try {
    console.log("xxx");
    return await Customers.find();
  } catch (e) {
    log.info(e);
  }
};

/**
 * Get item from DB by ID
 * @param string id
 * @returns
 */
const getCustomerByID = async (id: string) => {
  try {
    const singleCustomer = await Customers.findById(id).exec();
    if (!singleCustomer) {
      throw Error;
    }
    const { _id, first_name, user_name, email, password } =
      singleCustomer;
    return {
      id: _id,
      first_name: first_name,
      user_name: user_name,
      email: email,
      password: password,
    };
  } catch (e) {
    log.info(e);
  }
};

const customerUserLogin = async (value: { user_name: any; password: any; }) => {
  try {
    const { user_name, password } = value;
    const singleAdmin = await Customers.findOne({ "user_name": user_name, "password": md5(password) } ).exec();
    if (!singleAdmin) {
      throw Error;
    }else{

      console.log({singleAdmin});

      const { _id, first_name, email, user_name } =
        singleAdmin;
      return {
        id: _id,
        first_name: first_name,
        user_name: user_name,
        email: email,
        password: password,
  
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
const createCustomer = async (value: Customer) => {
  const { first_name, user_name, email, password } = value;

  try {
    const newCustomer = new Customers({
      first_name: first_name,
      user_name: user_name,
      email: email,
      password: password,
    });

    return await newCustomer.save();
  } catch (e) {
    log.info(e);
  }
};

/**
 * Update a entry in DB by ID
 * @param string value
 * @param id
 */
const updateCustomerData = async (value: Customer, id: string) => {
  const { first_name, user_name, email, password, } = value;
  try {

    Customers.findByIdAndUpdate(
      id,
      {
        first_name: first_name,
        user_name: user_name,
        email: email,
        password: password,
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
  deleteCustomer,
  getAllCustomers,
  getCustomerByID,
  createCustomer,
  updateCustomerData,
  customerUserLogin,
};
