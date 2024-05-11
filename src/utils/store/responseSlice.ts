import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseState } from "../types";

const initialState: ResponseState = {
  loading: true,
  response: null,
};

export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    loader: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
    response: (state, action: PayloadAction<any>) => {
      state.response = action?.payload;
    },
  },
});

export const { loader, response } = responseSlice.actions;
export default responseSlice.reducer;
