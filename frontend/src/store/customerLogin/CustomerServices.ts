import axios,{ AxiosError } from "axios";
import validator from 'validator';

import {
  BASE_URL,
  CUSTOMER_LOGIN_GETALL_API,
  CUSTOMER_LOGIN_GET_SINGLE_API,
  CUSTOMER_LOGIN_POST_API,
} from "../../api/customerlogin.api";


type Customer = {
  _id?: string;
  first_name :String;
  user_name: String;
  email: String;
  password: String;
}

const customerApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const getAllCustomersAPI = async () => {
  try {
    const response = await customerApi.get(CUSTOMER_LOGIN_GETALL_API);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const postCustomerAPI = async (customer: Customer) => {
  try {
    return await customerApi.post(CUSTOMER_LOGIN_POST_API, customer);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const getCustomerByIdAPI = async (empId: string) => {
  try {
    const response = await customerApi.get(CUSTOMER_LOGIN_GET_SINGLE_API(empId));
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};


export default customerApi;
