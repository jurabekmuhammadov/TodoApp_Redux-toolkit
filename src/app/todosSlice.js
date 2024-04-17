import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("http://localhost:3000/todos");
  const data = await response.json();
  return data;
});

export const addTodoAsync = (desc) => async (dispatch) => {
  if (desc !== "") {
    try {
      const response = await axios.post("http://localhost:3000/todos", {
        desc,
        complete: false,
        date: new Date().toLocaleDateString(),
      });
      dispatch(addTodo({
        id: response.data.id,
        desc: response.data.desc,
        complete: response.data.complete,
        date: response.data.date,
      }));
      fetchTodos();
    } catch (error) {
      console.error("Failed to add todo:", error.message);
    }
  }
};

export const deleteTodoAsync = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    dispatch(deleteTodo(id));
    fetchTodos();
  } catch (error) {
    console.error("Failed to delete todo:", error.message);
  }
};

export const toggleTodoComplete = (id) => {
  return {
    type: 'todos/toggleTodooComplete',
    payload: id,
  };
};

export const markAllCompleted = () => {
  return {
    type: 'todos/markAllCompleted',
  };
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.todos.push(action.payload);
      },
      prepare(desc) {
        return { payload: { id: Date.now(), desc, complete: false, date: new Date().toLocaleDateString() } };
      },
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos.splice(todoIndex, 1);
      }
    },
    toggleTodooComplete: (state, action) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
        if (todoIndex !== -1) {
          state.todos[todoIndex].complete = !state.todos[todoIndex].complete;
        }
    },
    markAllTodosCompleted: (state) => {
      state.todos.forEach(todo => todo.complete = true);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { addTodo, editTodo, deleteTodo, toggleTodooComplete, markAllTodosCompleted } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
