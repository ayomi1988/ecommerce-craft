export const BASE_URL = "http://localhost:8071/";

export const ADMIN_LOGIN_GETALL_API = '/crafts/admin';
export const ADMIN_LOGIN_GET_SINGLE_API = (empId:string = '') => `/crafts/admin/${empId}`;
export const ADMIN_LOGIN_POST_API = `/admin/login`;