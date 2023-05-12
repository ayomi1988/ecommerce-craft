var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteProduct, createProduct, getProductByID, getAllProducts, updateProductData, } from "../service/product.service";
import { productValidation, productSchemaValidation, productUpdateSchemaValidation, } from "../validation/validationSchema";
import { log } from "../logs/logger";
import { successApiResponse, errorsApiResponse, } from "../helpers/response_handler";
/**
 * Delete Product By ID
 * @param req
 * @param res
 * @returns
 */
const deleteAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.empId;
    try {
        yield deleteProduct(id);
        successApiResponse(res, "", "Deleted Successfully", 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Get all Product
 * @param req
 * @param res
 * @returns
 */
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = productValidation.validate(res.body);
    if (error) {
        return res.json(400).json({ error: error });
    }
    try {
        const data = yield getAllProducts();
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Product By ID
 * @param req
 * @param res
 * @returns
 */
const getprodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getProductByID(req.params.empId);
        successApiResponse(res, data, null, 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Create new Product
 * @param req
 * @param res
 * @returns
 */
const createAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = productSchemaValidation.validate(req.body);
    console.log(error);
    if (error) {
        errorsApiResponse(res, error.details, "Validation failed.", 409);
    }
    try {
        const data = yield createProduct(value);
        successApiResponse(res, data, null, 201);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
/**
 * Update Product by ID
 * @param req
 * @param res
 * @returns
 */
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = productUpdateSchemaValidation.validate(req.body);
    const id = req.params.empId;
    if (error) {
        errorsApiResponse(res, error.details, "Validation failed.", 409);
    }
    try {
        yield updateProductData(value, id);
        successApiResponse(res, "", "Updated Successfully", 200);
    }
    catch (e) {
        log.info(e);
        errorsApiResponse(res, e);
    }
});
export { deleteAProduct, getAllProduct, getprodById, createAProduct, updateProduct, };
