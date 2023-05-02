import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {
  postCustomerAPI,
  getCustomerByIdAPI,
  getAllCustomersAPI,
} from "./CustomerServices";

type Customer = {
  _id?: string;
  first_name: string;
  user_name: string;
  email: string;
  password: string;
}

type CustomerList={
    data: string[];
    loading:boolean;
    message:string;
    error?:string;
    singleRecord: object;
};

const initialState: CustomerList = {
  loading: false,
  error: "",
  data: [],
  message: "",
  singleRecord: {},
};

export const createCustomer = createAsyncThunk(
  "/crafts/create/customer",
  postCustomerAPI
);


export const fetchCustomers = createAsyncThunk<Customer[]>(
  "/crafts/get/customers",
  getAllCustomersAPI
);



export const fetchCustomerById = createAsyncThunk(
  "/crafts/getById/",
  getCustomerByIdAPI
);

const CustomerloginSlice = createSlice({
  name: "Customer",
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
    .addCase(createCustomer.fulfilled,(state, action) => {
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
    });
    builder
    .addCase(fetchCustomers.fulfilled, (state, action:PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });   
    builder
    .addCase(fetchCustomerById.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = '';
        state.singleRecord = action.payload
    });
  },
});

export default CustomerloginSlice.reducer;
