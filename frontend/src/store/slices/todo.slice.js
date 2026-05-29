import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";
import toast from "react-hot-toast";

const getAllTodos = createAsyncThunk("todo/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/todos");
    return res.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

const createTodo = createAsyncThunk("todo/create", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/todos", data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const editTodo = createAsyncThunk("todo/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/todos/${id}`, data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const deleteTodo = createAsyncThunk("todo/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete(`/todos/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const markAsCompleted = createAsyncThunk("todo/mark", async (id, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/todos/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    todo: {},
    loading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(getAllTodos.pending, state => {
        state.loading = true;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action?.payload?.data;
      })
      .addCase(getAllTodos.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to get all todos");
      })
      .addCase(createTodo.pending, state => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, state => {
        state.loading = false;
        toast.success("Todo created successfully");
      })
      .addCase(createTodo.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to create todo");
      })
      .addCase(editTodo.pending, state => {
        state.loading = true;
      })
      .addCase(editTodo.fulfilled, state => {
        state.loading = false;
        toast.success("Todo updated successfully");
      })
      .addCase(editTodo.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to update todo");
      })
      .addCase(deleteTodo.pending, state => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, state => {
        state.loading = false;
        toast.success("Todo deleted successfully");
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to delete todo");
      })
      .addCase(markAsCompleted.pending, state => {
        state.loading = true;
      })
      .addCase(markAsCompleted.fulfilled, state => {
        state.loading = false;
        toast.success("Checked/Unchecked successfully");
      })
      .addCase(markAsCompleted.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to Checked/Unchecked todo");
      })
  }
});

export { getAllTodos, createTodo, editTodo, deleteTodo, markAsCompleted };
export default todoSlice.reducer;