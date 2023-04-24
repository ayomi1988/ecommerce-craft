import { Request, Response } from "express";
import {
  deleteAdmin,
  createAdmin,
  getAdminByID,
  getAllAdmins,
  updateAdminData,
} from "../service/admin.service";
import {
  adminValidation,
  adminSchemaValidation,
  adminUpdateSchemaValidation,
  adminloginUpdateSchemaValidation,
} from "../validation/validationSchema";
import { log } from "../logs/logger";
import {
  successApiResponse,
  errorsApiResponse,
} from "../helpers/response_handler";

/**
 * Delete Admin By ID
 * @param req
 * @param res
 * @returns
 */
const deleteAAdmin = async (req: Request, res: Response) => {
  const id = req.params.empId;
  try {
    await deleteAdmin(id);
    successApiResponse(res, "", "Deleted Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Get all Admin
 * @param req
 * @param res
 * @returns
 */
const getAllAdmin = async (req: Request, res: any) => {
  const { error } = adminValidation.validate(res.body);
  if (error) {
    return res.json(400).json({ error: error });
  }
  try {
    const data = await getAllAdmins();
    successApiResponse(res, data, null, 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Admin By ID
 * @param req
 * @param res
 * @returns
 */
const getadmById = async (req: Request, res: any) => {
  try {
    const data = await getAdminByID(req.params.empId);
    successApiResponse(res, data, null, 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Create new Admin
 * @param req
 * @param res
 * @returns
 */
const createAAdmin = async (req: Request, res: Response) => {
  const { error, value } = adminSchemaValidation.validate(req.body);
  console.log(error);
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    const data = await createAdmin(value);
    successApiResponse(res, data, null, 201);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

/**
 * Update Admin by ID
 * @param req
 * @param res
 * @returns
 */
const updateAdmin = async (req: Request, res: Response) => {
  const { error, value } = adminUpdateSchemaValidation.validate(req.body);
  const id = req.params.empId;
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    await updateAdminData(value, id);
    successApiResponse(res, "", "Updated Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};


const loginAAdmin = async (req: Request, res: Response) => {
  const { error, value } = adminloginUpdateSchemaValidation.validate(req.body);
  const id = req.params.empId;
  if (error) {
    errorsApiResponse(res, error.details, "Validation failed.", 409);
  }
  try {
    await updateAdminData(value, id);
    successApiResponse(res, "", "login  Successfully", 200);
  } catch (e) {
    log.info(e);
    errorsApiResponse(res, e);
  }
};

export {
  deleteAAdmin,
  getAllAdmin,
  getadmById,
  createAAdmin,
  updateAdmin,
  loginAAdmin,
};
