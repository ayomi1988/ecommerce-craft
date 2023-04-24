import axios,{ AxiosError } from "axios";
import {
  BASE_URL,
  ORDER_DELETE_API,
  ORDER_GETALL_API,
  ORDER_GET_SINGLE_API,
  ORDER_POST_API,
  ORDER_UPDATE_API,
} from "../../api/orders.api";


type Order = {
  _id?: string;
  first_name: string;
  email: string;
  order_number : string;
  price:  string;
  product_name:  string;
  quantity:  string;
  total: string;
}

const orderApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const getAllOrdersAPI = async () => {
  try {
    const response = await orderApi.get(ORDER_GETALL_API);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const postOrderAPI = async (order: Order) => {
  try {
    return await orderApi.post(ORDER_POST_API, order);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const getOrderByIdAPI = async (empId: string) => {
  try {
    const response = await orderApi.get(ORDER_GET_SINGLE_API(empId));
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const deleteOrderByIdAPI = async (empId: string) => {
  return await orderApi.delete(ORDER_DELETE_API(empId));
};

export const updateOrdersAPI = async (orders: Order) => {
  try {
    return await orderApi.put(ORDER_UPDATE_API(orders._id), orders);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export default orderApi;
