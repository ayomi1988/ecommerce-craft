var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteAdmin, createAdmin, getAdminByID, getAllAdmins, updateAdminData, adminUserLogin, } from "../service/admin.service";
import { adminValidation, adminSchemaValidation, adminUpdateSchemaValidation, } from "../validation/validationSchema";
import { log } from "../logs/logger";
import { successApiResponse, errorsApiResponse, } from "../helpers/response_handler";
/**
 * Delete Admin By ID
 * @param req
 * @param res
 * @returns
 */
const deleteAAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.empId;
    try {
        yield deleteAdmin(id);
        successApiResponse(res, "", "Deleted Successfully", 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Get all Admin
 * @param req
 * @param res
 * @returns
 */
const getAllAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = adminValidation.validate(res.body);
    if (error) {
        return res.json(400).json({ error: error });
    }
    try {
        const data = yield getAllAdmins();
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Admin By ID
 * @param req
 * @param res
 * @returns
 */
const getadmById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getAdminByID(req.params.empId);
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Create new Admin
 * @param req
 * @param res
 * @returns
 */
const createAAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = adminSchemaValidation.validate(req.body);
    console.log(error);
    if (error) {
        errorsApiResponse(res, error.details, "Validation failed.", 409);
    }
    try {
        const data = yield createAdmin(value);
        successApiResponse(res, data, null, 201);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Update Admin by ID
 * @param req
 * @param res
 * @returns
 */
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = adminUpdateSchemaValidation.validate(req.body);
    const id = req.params.empId;
    if (error) {
        errorsApiResponse(res, error.details, "Validation failed.", 409);
    }
    try {
        yield updateAdminData(value, id);
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
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = req.body;
        console.log(user_name);
        console.log(password);
        const data = yield adminUserLogin(req.body);
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, {}, "invalid login details", 401);
    }
});
export { deleteAAdmin, getAllAdmin, getadmById, createAAdmin, updateAdmin, loginAdmin };
