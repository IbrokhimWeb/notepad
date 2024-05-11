import { configureStore } from "@reduxjs/toolkit";
import paramsSlice from "./paramsSlice";
import responseSlice from "./responseSlice";
import noteSlice from "./noteSlice";

export const store = configureStore({
  reducer: {
    params: paramsSlice,
    res: responseSlice,
    note: noteSlice,
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
