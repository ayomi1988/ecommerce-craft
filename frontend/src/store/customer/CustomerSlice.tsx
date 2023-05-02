import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {
  postCustomerAPI,
  getCustomerByIdAPI,
  deleteCustomerByIdAPI,
  updateCustomersAPI,
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
  "/crafts/create/Customer",
  postCustomerAPI
);

export const deleteCustomer = createAsyncThunk(
  "/crafts/deleteCustomer",
  deleteCustomerByIdAPI
);

export const fetchCustomers = createAsyncThunk<Customer[]>(
  "/crafts/get/customers",
  getAllCustomersAPI
);

export const updateCustomer = createAsyncThunk(
  "/crafts/update/Customer",
  updateCustomersAPI
);

export const fetchCustomerById = createAsyncThunk(
  "/crafts/getById/",
  getCustomerByIdAPI
);

const CustomerSlice = createSlice({
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
    .addCase(updateCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
    });
    builder
    .addCase(deleteCustomer.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
      state.data = state.data.filter(
        (Customers: any) => Customers._id !== action.payload.data._id
      );
    });
    builder
    .addCase(fetchCustomerById.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = '';
        state.singleRecord = action.payload
    });
  },
});

export default CustomerSlice.reducer;
