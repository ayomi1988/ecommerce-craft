export const BASE_URL = "http://localhost:8071/";

export const CUSTOMER_LOGIN_GETALL_API = '/crafts/customers';
export const CUSTOMER_LOGIN_GET_SINGLE_API = (empId:string = '') => `/crafts/customers/${empId}`;
export const CUSTOMER_LOGIN_POST_API = `/crafts/login`;