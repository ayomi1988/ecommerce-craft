import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "./CustomerSlice";

export const customerstore = configureStore({
  reducer: {
    customers: CustomerSlice,
  },
});

export type AppDisptach = typeof customerstore.dispatch;
export type RootStore = ReturnType<typeof customerstore.getState>;
