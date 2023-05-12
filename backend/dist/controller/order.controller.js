var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteOrder, createOrder, getOrderByID, getAllOrders, updateOrderData, } from "../service/order.service";
import { orderValidation, orderSchemaValidation, orderUpdateSchemaValidation, } from "../validation/validationSchema";
import { log } from "../logs/logger";
import { successApiResponse, errorsApiResponse, } from "../helpers/response_handler";
/**
 * Delete Order By ID
 * @param req
 * @param res
 * @returns
 */
const deleteAOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.empId;
    try {
        yield deleteOrder(id);
        successApiResponse(res, "", "Deleted Successfully", 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Get all Order
 * @param req
 * @param res
 * @returns
 */
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = orderValidation.validate(res.body);
    if (error) {
        return res.json(400).json({ error: error });
    }
    try {
        const data = yield getAllOrders();
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Order By ID
 * @param req
 * @param res
 * @returns
 */
const getordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getOrderByID(req.params.empId);
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Create new Order
 * @param req
 * @param res
 * @returns
 */
const createAOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = orderSchemaValidation.validate(req.body);
    console.log(error);
    if (error) {
        errorsApiResponse(res, error.details, "Validation failed.", 409);
    }
    try {
        const data = yield createOrder(value);
        successApiResponse(res, data, null, 201);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Update Order by ID
 * @param req
 * @param res
 * @returns
 */
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = orderUpdateSchemaValidation.validate(req.body);
    const id = req.params.empId;
    if (error) {
        errorsApiResponse(res, error.details, "Validation failed.", 409);
    }
    try {
        yield updateOrderData(value, id);
        successApiResponse(res, "", "Updated Successfully", 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
export { deleteAOrder, getAllOrder, getordById, createAOrder, updateOrder, };
