import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./AdminSlice";

export const adminstore = configureStore({
  reducer: {
    admins: AdminSlice,
  },
});

export type AppDisptach = typeof adminstore.dispatch;
export type RootStore = ReturnType<typeof adminstore.getState>;
