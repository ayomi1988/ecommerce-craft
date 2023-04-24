import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {
  postCraftAPI,
  getCraftByIdAPI,
  deleteCraftByIdAPI,
  updateCraftsAPI,
  getAllCraftsAPI,
} from "./CraftServices";

type Craft = {
  _id?: string;
  product_name :string;
  price:  string;
  quantity:  string;
  description:  string;
}

type CraftList={
    data: string[];
    loading:boolean;
    message:string;
    error?:string;
    singleRecord: object;
};

const initialState: CraftList = {
  loading: false,
  error: "",
  data: [],
  message: "",
  singleRecord: {},
};

export const createCraft = createAsyncThunk(
  "/crafts/create/Craft",
  postCraftAPI
);

export const deleteCraft = createAsyncThunk(
  "/crafts/deleteCraft",
  deleteCraftByIdAPI
);

export const fetchCrafts = createAsyncThunk<Craft[]>(
  "/crafts/get/crafts",
  getAllCraftsAPI
);

export const updateCraft = createAsyncThunk(
  "/crafts/update/Craft",
  updateCraftsAPI
);

export const fetchCraftById = createAsyncThunk(
  "/crafts/getById/",
  getCraftByIdAPI
);

const CraftSlice = createSlice({
  name: "Craft",
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
    .addCase(createCraft.fulfilled,(state, action) => {
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
    });
    builder
    .addCase(fetchCrafts.fulfilled, (state, action:PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder
    .addCase(updateCraft.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
    });
    builder
    .addCase(deleteCraft.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = "";
      state.message = "Successfully";
      state.data = state.data.filter(
        (Crafts: any) => Crafts._id !== action.payload.data._id
      );
    });
    builder
    .addCase(fetchCraftById.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = '';
        state.singleRecord = action.payload
    });
  },
});

export default CraftSlice.reducer;
