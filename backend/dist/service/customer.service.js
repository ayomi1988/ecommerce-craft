var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Customers } from "../model/customer.model";
import { log } from "../logs/logger";
var md5 = require('md5');
/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCustomer = yield Customers.deleteOne({ _id: id });
        if (deletedCustomer.deletedCount == 0) {
            throw new Error("Could not find");
        }
    }
    catch (e) {
        log.info(e);
    }
});
/**
 * Return all items from DB
 * @returns
 */
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("xxx");
        return yield Customers.find();
    }
    catch (e) {
        log.info(e);
    }
});
/**
 * Get item from DB by ID
 * @param string id
 * @returns
 */
const getCustomerByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleCustomer = yield Customers.findById(id).exec();
        if (!singleCustomer) {
            throw Error;
        }
        const { _id, first_name, user_name, email, password } = singleCustomer;
        return {
            id: _id,
            first_name: first_name,
            user_name: user_name,
            email: email,
            password: password,
        };
    }
    catch (e) {
        log.info(e);
    }
});
const customerUserLogin = (value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = value;
        const singleAdmin = yield Customers.findOne({ "user_name": user_name, "password": md5(password) }).exec();
        if (!singleAdmin) {
            throw Error;
        }
        else {
            console.log({ singleAdmin });
            const { _id, first_name, email, user_name } = singleAdmin;
            return {
                id: _id,
                first_name: first_name,
                user_name: user_name,
                email: email,
                password: password,
            };
        }
    }
    catch (e) {
        throw Error;
        log.info(e);
    }
});
/**
 * Create item in DB
 * @param object value
 * @returns
 */
const createCustomer = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, user_name, email, password } = value;
    try {
        const newCustomer = new Customers({
            first_name: first_name,
            user_name: user_name,
            email: email,
            password: password,
        });
        return yield newCustomer.save();
    }
    catch (e) {
        log.info(e);
    }
});
/**
 * Update a entry in DB by ID
 * @param string value
 * @param id
 */
const updateCustomerData = (value, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, user_name, email, password, } = value;
    try {
        Customers.findByIdAndUpdate(id, {
            first_name: first_name,
            user_name: user_name,
            email: email,
            password: password,
        }, function (err, docs) {
            if (err) {
                throw err;
            }
            else {
                console.log("Updated User : ", docs);
            }
        });
    }
    catch (e) {
        log.info(e);
    }
});
export { deleteCustomer, getAllCustomers, getCustomerByID, createCustomer, updateCustomerData, customerUserLogin, };
