import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {
  postAdminAPI,
  getAdminByIdAPI,
  getAllAdminsAPI,
} from "./AdminServices";

type Admin = {
  _id?: string;
  first_name: string;
  user_name: string;
  email: string;
  password: string;
}

type AdminList={
    data: string[];
    loading:boolean;
    message:string;
    error?:string;
    singleRecord: object;
};

const initialState: AdminList = {
  loading: false,
  error: "",
  data: [],
  message: "",
  singleRecord: {},
};

export const createAdmin = createAsyncThunk(
  "/crafts/create/Admin",
  postAdminAPI
);


export const fetchAdmins = createAsyncThunk<Admin[]>(
  "/crafts/get/admins",
  getAllAdminsAPI
);



export const fetchAdminById = createAsyncThunk(
  "/crafts/getById/",
  getAdminByIdAPI
);

const AdminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
    .addCase(createAdmin.fulfilled,(state, action) => {
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
    });
    builder
    .addCase(fetchAdmins.fulfilled, (state, action:PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });   
    builder
    .addCase(fetchAdminById.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = '';
        state.singleRecord = action.payload
    });
  },
});

export default AdminSlice.reducer;
