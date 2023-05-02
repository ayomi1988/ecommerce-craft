export const BASE_URL = "http://localhost:8071/";

export const ADMIN_GETALL_API = '/crafts/admin';
export const ADMIN_GET_SINGLE_API = (empId:string = '') => `/crafts/admin/${empId}`;
export const ADMIN_POST_API = `/crafts/admin`;
export const ADMIN_UPDATE_API = (empId:string = '') => `/crafts/admin/${empId}`;
export const ADMIN_DELETE_API = (empId:string = '') => `/crafts/admin/${empId}`;