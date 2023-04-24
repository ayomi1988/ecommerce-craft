import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {
  postOrderAPI,
  getOrderByIdAPI,
  deleteOrderByIdAPI,
  updateOrdersAPI,
  getAllOrdersAPI,
} from "./OrderServices";

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

type OrderList={
    data: string[];
    loading:boolean;
    message:string;
    error?:string;
    singleRecord: object;
};

const initialState: OrderList = {
  loading: false,
  error: "",
  data: [],
  message: "",
  singleRecord: {},
};

export const createOrder = createAsyncThunk(
  "/crafts/create/Order",
  postOrderAPI
);

export const deleteOrder = createAsyncThunk(
  "/crafts/deleteOrder",
  deleteOrderByIdAPI
);

export const fetchOrders = createAsyncThunk<Order[]>(
  "/crafts/get/Orders",
  getAllOrdersAPI
);

export const updateOrder = createAsyncThunk(
  "/crafts/update/Order",
  updateOrdersAPI
);

export const fetchOrderById = createAsyncThunk(
  "/crafts/getById/",
  getOrderByIdAPI
);

const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
    .addCase(createOrder.fulfilled,(state, action) => {
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
    });
    builder
    .addCase(fetchOrders.fulfilled, (state, action:PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder
    .addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
    });
    builder
    .addCase(deleteOrder.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
      state.data = state.data.filter(
        (Orders: any) => Orders._id !== action.payload.data._id
      );
    });
    builder
    .addCase(fetchOrderById.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = '';
        state.singleRecord = action.payload
    });
  },
});

export default OrderSlice.reducer;
