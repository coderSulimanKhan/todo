import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo.slice.js";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  }
});

export default store;