import axios,{ AxiosError } from "axios";
import {
  BASE_URL,
  CRAFT_DELETE_API,
  CRAFT_GETALL_API,
  CRAFT_GET_SINGLE_API,
  CRAFT_POST_API,
  CRAFT_UPDATE_API,
} from "../../api/crafts.api";


type Craft = {
  _id?: string;
  product_name :string;
  price:  string;
  quantity:  string;
  description:  string;
}

const craftApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const getAllCraftsAPI = async () => {
  try {
    const response = await craftApi.get(CRAFT_GETALL_API);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const postCraftAPI = async (craft: Craft) => {
  try {
    return await craftApi.post(CRAFT_POST_API, craft);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const getCraftByIdAPI = async (empId: string) => {
  try {
    const response = await craftApi.get(CRAFT_GET_SINGLE_API(empId));
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export const deleteCraftByIdAPI = async (empId: string) => {
  return await craftApi.delete(CRAFT_DELETE_API(empId));
};

export const updateCraftsAPI = async (crafts: Craft) => {
  try {
    return await craftApi.put(CRAFT_UPDATE_API(crafts._id), crafts);
  } catch (error: any) {
    console.error(error);
    let err = error as AxiosError;
    throw err;
  }
};

export default craftApi;
