var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Admins } from "../model/admin.model";
import { log } from "../logs/logger";
var md5 = require('md5');
/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAdmin = yield Admins.deleteOne({ _id: id });
        if (deletedAdmin.deletedCount == 0) {
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
const getAllAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("xxx");
        return yield Admins.find();
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
const getAdminByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleAdmin = yield Admins.findById(id).exec();
        if (!singleAdmin) {
            throw Error;
        }
        const { _id, first_name, user_name, email, password } = singleAdmin;
        return {
            id: _id,
            first_name: first_name,
            user_name: user_name,
            email: email,
            password: password
        };
    }
    catch (e) {
        log.info(e);
    }
});
const adminUserLogin = (value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = value;
        const singleAdmin = yield Admins.findOne({ "user_name": user_name, "password": md5(password) }).exec();
        if (!singleAdmin) {
            throw Error;
        }
        else {
            console.log({ singleAdmin });
            const { _id, first_name, email } = singleAdmin;
            return {
                id: _id,
                first_name: first_name,
                user_name: user_name,
                email: email,
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
const createAdmin = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, user_name, email, password } = value;
    try {
        const newAdmin = new Admins({
            first_name: first_name,
            user_name: user_name,
            email: email,
            password: md5(password)
        });
        return yield newAdmin.save();
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
const updateAdminData = (value, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, user_name, email, password } = value;
    try {
        Admins.findByIdAndUpdate(id, {
            first_name: first_name,
            user_name: user_name,
            email: email,
            password: password
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
export { deleteAdmin, getAllAdmins, getAdminByID, createAdmin, updateAdminData, adminUserLogin };
