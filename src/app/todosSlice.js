import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    loading: false,
    error: null,
    todos: [],
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", () => 
    axios.get("http://localhost:3000/todos").then((res) => res.data).catch((error) => error.message)
);

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true,
            state.todos = [],
            state.error = null
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false,
            state.todos = action.payload,
            state.error = ""
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false,
            state.todos = [],
            state.error = action.payload
        })

    }
})

export const todosReducer = todosSlice.reducer;
export const todosActions = todosSlice.actions;