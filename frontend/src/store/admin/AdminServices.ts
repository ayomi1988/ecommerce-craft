import axios,{ AxiosError } from "axios";

import {
  BASE_URL,
  ADMIN_DELETE_API,
  ADMIN_GETALL_API,
  ADMIN_GET_SINGLE_API,
  ADMIN_POST_API,
  ADMIN_UPDATE_API,
} from "../../api/admins.api";


type Admin = {
  _id?: string;
  first_name :string;
  user_name: string;
  email: string;
  password: string;
}

const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const getAllAdminsAPI = async () => {
  try {
    const response = await adminApi.get(ADMIN_GETALL_API);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const postAdminAPI = async (admin: Admin) => {
  try {
    return await adminApi.post(ADMIN_POST_API, admin);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const getAdminByIdAPI = async (empId: string) => {
  try {
    const response = await adminApi.get(ADMIN_GET_SINGLE_API(empId));
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const deleteAdminByIdAPI = async (empId: string) => {
  return await adminApi.delete(ADMIN_DELETE_API(empId));
};

export const updateAdminsAPI = async (admins: Admin) => {
  try {
    return await adminApi.put(ADMIN_UPDATE_API(admins._id), admins);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export default adminApi;
