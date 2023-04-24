import { Request, Response } from "express";
import {
  deleteCustomer,
  createCustomer,
  getCustomerByID,
  getAllCustomers,
  updateCustomerData,
} from "../service/customer.service";
import {
  itemValidation,
  itemSchemaValidation,
  itemUpdateSchemaValidation,
} from "../validation/validationSchema";
import { log } from "../logs/logger";
import {
  successApiResponse,
  errorsApiResponse,
} from "../helpers/response_handler";

/**
 * Delete Customer By ID
 * @param req
 * @param res
 * @returns
 */
const deleteACustomer = async (req: Request, res: Response) => {
  const id = req.params.empId;
  try {
    await deleteCustomer(id);
    successApiResponse(res, "", "Deleted Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Get all Customer
 * @param req
 * @param res
 * @returns
 */
const getAllCustomer = async (req: Request, res: any) => {
  const { error } = itemValidation.validate(res.body);
  if (error) {
    return res.json(400).json({ error: error });
  }
  try {
    const data = await getAllCustomers();
    successApiResponse(res, data, null, 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Customer By ID
 * @param req
 * @param res
 * @returns
 */
const getcusById = async (req: Request, res: any) => {
  try {
    const data = await getCustomerByID(req.params.empId);
    successApiResponse(res, data, null, 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Create new Customer
 * @param req
 * @param res
 * @returns
 */
const createACustomer = async (req: Request, res: Response) => {
  const { error, value } = itemSchemaValidation.validate(req.body);
  console.log(error);
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    const data = await createCustomer(value);
    successApiResponse(res, data, null, 201);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Update Customer by ID
 * @param req
 * @param res
 * @returns
 */
const updateCustomer = async (req: Request, res: Response) => {
  const { error, value } = itemUpdateSchemaValidation.validate(req.body);
  const id = req.params.empId;
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    await updateCustomerData(value, id);
    successApiResponse(res, "", "Updated Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

export {
  deleteACustomer,
  getAllCustomer,
  getcusById,
  createACustomer,
  updateCustomer,
};
