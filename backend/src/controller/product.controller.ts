import { Request, Response } from "express";
import {
  deleteProduct,
  createProduct,
  getProductByID,
  getAllProducts,
  updateProductData,
} from "../service/product.service";
import {
  productValidation,
  productSchemaValidation,
  productUpdateSchemaValidation,
} from "../validation/validationSchema";
import { log } from "../logs/logger";
import {
  successApiResponse,
  errorsApiResponse,
} from "../helpers/response_handler";

/**
 * Delete Product By ID
 * @param req
 * @param res
 * @returns
 */
const deleteAProduct = async (req: Request, res: Response) => {
  const id = req.params.empId;
  try {
    await deleteProduct(id);
    successApiResponse(res, "", "Deleted Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Get all Product
 * @param req
 * @param res
 * @returns
 */
const getAllProduct = async (req: Request, res: any) => {
  const { error } = productValidation.validate(res.body);
  if (error) {
    return res.json(400).json({ error: error });
  }
  try {
    const data = await getAllProducts();
    successApiResponse(res, data, null, 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Product By ID
 * @param req
 * @param res
 * @returns
 */
const getprodById = async (req: Request, res: any) => {
  try {
    const data = await getProductByID(req.params.empId);
    successApiResponse(res, data, null, 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Create new Product
 * @param req
 * @param res
 * @returns
 */
const createAProduct = async (req: Request, res: Response) => {
  const { error, value } = productSchemaValidation.validate(req.body);
  //console.log(error);
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    const data = await createProduct(value);
    successApiResponse(res, data, null, 201);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Update Product by ID
 * @param req
 * @param res
 * @returns
 */
const updateProduct = async (req: Request, res: Response) => {
  const { error, value } = productUpdateSchemaValidation.validate(req.body);
  const id = req.params.empId;
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    await updateProductData(value, id);
    successApiResponse(res, "", "Updated Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

export {
  deleteAProduct,
  getAllProduct,
  getprodById,
  createAProduct,
  updateProduct,
};
