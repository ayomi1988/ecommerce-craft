import { configureStore } from "@reduxjs/toolkit";
import CraftSlice from "./CraftSlice";

export const craftstore = configureStore({
  reducer: {
    crafts: CraftSlice,
  },
});

export type AppDisptach = typeof craftstore.dispatch;
export type RootStore = ReturnType<typeof craftstore.getState>;
