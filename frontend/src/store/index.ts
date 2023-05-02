import { configureStore } from "@reduxjs/toolkit";
import OrderSlice from "./order/OrderSlice";
import CraftSlice from "./craft/CraftSlice";
import AdminSlice from "./admin/AdminSlice";
import AdminloginSlice from "./adminLogin/AdminSlice";
import CustomerloginSlice from "./customerLogin/CustomerSlice";
import CustomerSlice from "./customer/CustomerSlice";

export const store = configureStore({
  reducer: {
    orders: OrderSlice,
    crafts: CraftSlice,
    admins: AdminSlice,
    adminlogin: AdminloginSlice,
    customerlogin: CustomerloginSlice,
    customers: CustomerSlice,
  },
});

export type AppDisptach = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;
