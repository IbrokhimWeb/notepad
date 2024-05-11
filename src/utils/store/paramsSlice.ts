import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParamsState } from "../types";

const initialState: ParamsState = {
  search: "",
  isCompleted: "",
  page: 1,
  page_size: 10,
};

export const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action?.payload;
    },
    setIsCompleted: (state, action: PayloadAction<string>) => {
      state.isCompleted = action?.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action?.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.page_size = action?.payload;
      state.page = 1;
    },
  },
});

export const { setSearch, setPage, setPageSize, setIsCompleted } =
  paramsSlice.actions;
export default paramsSlice.reducer;
