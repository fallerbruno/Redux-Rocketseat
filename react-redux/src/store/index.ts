import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// categorização do estado
const todoSlice = createSlice({
  name: "todo",
  initialState: ["fazer café", "estudar react"],

  reducers: {
    add: (state, action) => {
      state.push(action.payload.newTodo);
    },
  },
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export const { add } = todoSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
