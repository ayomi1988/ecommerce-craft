export const BASE_URL = "http://localhost:8071/";

export const ORDER_GETALL_API = '/crafts/orders';
export const ORDER_GET_SINGLE_API = (empId:string = '') => `/crafts/orders/${empId}`;
export const ORDER_POST_API = `/crafts/orders`;
export const ORDER_UPDATE_API = (empId:string = '') => `/crafts/orders/${empId}`;
export const ORDER_DELETE_API = (empId:string = '') => `/crafts/orders/${empId}`;