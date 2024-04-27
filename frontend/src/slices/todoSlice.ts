// slices/todoSlice.js
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Todo {
  _id: string;
  text: string;
  description: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    doneTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ _id: string; text: string }>) => {
      const todo = state.todos.find((todo) => todo._id === action.payload._id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const { addTodo, doneTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
