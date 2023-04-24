import { Request, Response } from "express";
import {
  deleteOrder,
  createOrder,
  getOrderByID,
  getAllOrders,
  updateOrderData,
} from "../service/order.service";
import {
  orderValidation,
  orderSchemaValidation,
  orderUpdateSchemaValidation,
} from "../validation/validationSchema";
import { log } from "../logs/logger";
import {
  successApiResponse,
  errorsApiResponse,
} from "../helpers/response_handler";

/**
 * Delete Order By ID
 * @param req
 * @param res
 * @returns
 */
const deleteAOrder = async (req: Request, res: Response) => {
  const id = req.params.empId;
  try {
    await deleteOrder(id);
    successApiResponse(res, "", "Deleted Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Get all Order
 * @param req
 * @param res
 * @returns
 */
const getAllOrder = async (req: Request, res: any) => {
  const { error } = orderValidation.validate(res.body);
  if (error) {
    return res.json(400).json({ error: error });
  }
  try {
    const data = await getAllOrders();
    successApiResponse(res, data, null, 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Order By ID
 * @param req
 * @param res
 * @returns
 */
const getordById = async (req: Request, res: any) => {
  try {
    const data = await getOrderByID(req.params.empId);
    successApiResponse(res, data, null, 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Create new Order
 * @param req
 * @param res
 * @returns
 */
const createAOrder = async (req: Request, res: Response) => {
  const { error, value } = orderSchemaValidation.validate(req.body);
  console.log(error);
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    const data = await createOrder(value);
    successApiResponse(res, data, null, 201);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Update Order by ID
 * @param req
 * @param res
 * @returns
 */
const updateOrder = async (req: Request, res: Response) => {
  const { error, value } = orderUpdateSchemaValidation.validate(req.body);
  const id = req.params.empId;
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    await updateOrderData(value, id);
    successApiResponse(res, "", "Updated Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

export {
  deleteAOrder,
  getAllOrder,
  getordById,
  createAOrder,
  updateOrder,
};
