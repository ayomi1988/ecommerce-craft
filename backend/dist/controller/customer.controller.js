var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteCustomer, createCustomer, getCustomerByID, getAllCustomers, updateCustomerData, customerUserLogin, } from "../service/customer.service";
import { itemValidation, itemSchemaValidation, itemUpdateSchemaValidation, } from "../validation/validationSchema";
import { log } from "../logs/logger";
import { successApiResponse, errorsApiResponse, } from "../helpers/response_handler";
/**
 * Delete Customer By ID
 * @param req
 * @param res
 * @returns
 */
const deleteACustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.empId;
    try {
        yield deleteCustomer(id);
        successApiResponse(res, "", "Deleted Successfully", 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Get all Customer
 * @param req
 * @param res
 * @returns
 */
const getAllCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = itemValidation.validate(res.body);
    if (error) {
        return res.json(400).json({ error: error });
    }
    try {
        const data = yield getAllCustomers();
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Customer By ID
 * @param req
 * @param res
 * @returns
 */
const getcusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getCustomerByID(req.params.empId);
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Create new Customer
 * @param req
 * @param res
 * @returns
 */
const createACustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = itemSchemaValidation.validate(req.body);
    console.log(error);
    if (error) {
        errorsApiResponse(res, error.details, "Validation failed.", 409);
    }
    try {
        const data = yield createCustomer(value);
        successApiResponse(res, data, null, 201);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Update Customer by ID
 * @param req
 * @param res
 * @returns
 */
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = itemUpdateSchemaValidation.validate(req.body);
    const id = req.params.empId;
    if (error) {
        errorsApiResponse(res, error.details, "Validation failed.", 409);
    }
    try {
        yield updateCustomerData(value, id);
        successApiResponse(res, "", "Updated Successfully", 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 *
 * @param req
 * @param res
 */
const loginCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = req.body;
        console.log(user_name);
        console.log(password);
        const data = yield customerUserLogin(req.body);
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, {}, "invalid login details", 401);
    }
});
export { deleteACustomer, getAllCustomer, getcusById, createACustomer, updateCustomer, loginCustomer, };
