import { configureStore } from "@reduxjs/toolkit";
import AdminRedux from "./Slice/Admin";
import DataRedux from "./Slice/getData";

export const DataStore = configureStore({
  reducer: {
    storeData: DataRedux,
    AdminData: AdminRedux,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof DataStore.getState>;
export type AppDispatch = typeof DataStore.dispatch;
