export const BASE_URL = "http://localhost:8071/";

export const CUSTOMER_GETALL_API = '/crafts/customers';
export const CUSTOMER_GET_SINGLE_API = (empId:string = '') => `/crafts/customers/${empId}`;
export const CUSTOMER_POST_API = `/crafts/customers`;
export const CUSTOMER_UPDATE_API = (empId:string = '') => `/crafts/customers/${empId}`;
export const CUSTOMER_DELETE_API = (empId:string = '') => `/crafts/customers/${empId}`;