import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteState } from "../types";

const initialState: NoteState = {
  id: null,
  title: "",
  content: "",
  isCompleted: false,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number | null>) => {
      state.id = action?.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action?.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action?.payload;
    },
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action?.payload;
    },
  },
});

export const { setId, setTitle, setContent, setCompleted } = noteSlice.actions;
export default noteSlice.reducer;
