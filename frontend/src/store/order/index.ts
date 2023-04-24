import { configureStore } from "@reduxjs/toolkit";
import OrderSlice from "./OrderSlice";

export const orderstore = configureStore({
  reducer: {
    orders: OrderSlice,
  },
});

export type AppDisptach = typeof orderstore.dispatch;
export type RootStore = ReturnType<typeof orderstore.getState>;
