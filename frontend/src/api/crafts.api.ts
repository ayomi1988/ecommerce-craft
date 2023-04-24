export const BASE_URL = "http://localhost:8070/";

export const CRAFT_GETALL_API = '/crafts/products';
export const CRAFT_GET_SINGLE_API = (empId:string = '') => `/crafts/products/${empId}`;
export const CRAFT_POST_API = `/crafts/products`;
export const CRAFT_UPDATE_API = (empId:string = '') => `/crafts/products/${empId}`;
export const CRAFT_DELETE_API = (empId:string = '') => `/crafts/products/${empId}`;