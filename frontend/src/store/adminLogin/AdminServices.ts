import axios,{ AxiosError } from "axios";
import validator from 'validator';

import {
  BASE_URL,
  ADMIN_LOGIN_GETALL_API,
  ADMIN_LOGIN_GET_SINGLE_API,
  ADMIN_LOGIN_POST_API,
} from "../../api/adminlogin.api";


type Admin = {
  _id?: string;
  first_name :String;
  user_name: String;
  email: String;
  password: String;
}

const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const getAllAdminsAPI = async () => {
  try {
    const response = await adminApi.get(ADMIN_LOGIN_GETALL_API);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const postAdminAPI = async (admin: Admin) => {
  try {
    return await adminApi.post(ADMIN_LOGIN_POST_API, admin);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const getAdminByIdAPI = async (empId: string) => {
  try {
    const response = await adminApi.get(ADMIN_LOGIN_GET_SINGLE_API(empId));
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};


export default adminApi;
