import axios,{ AxiosError } from "axios";
import {
  BASE_URL,
  CUSTOMER_DELETE_API,
  CUSTOMER_GETALL_API,
  CUSTOMER_GET_SINGLE_API,
  CUSTOMER_POST_API,
  CUSTOMER_UPDATE_API,
} from "../../api/customers.api";


type Customer = {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const customerApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const getAllCustomersAPI = async () => {
  try {
    const response = await customerApi.get(CUSTOMER_GETALL_API);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const postCustomerAPI = async (customer: Customer) => {
  try {
    return await customerApi.post(CUSTOMER_POST_API, customer);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const getCustomerByIdAPI = async (empId: string) => {
  try {
    const response = await customerApi.get(CUSTOMER_GET_SINGLE_API(empId));
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const deleteCustomerByIdAPI = async (empId: string) => {
  return await customerApi.delete(CUSTOMER_DELETE_API(empId));
};

export const updateCustomersAPI = async (customers: Customer) => {
  try {
    return await customerApi.put(CUSTOMER_UPDATE_API(customers._id), customers);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export default customerApi;
