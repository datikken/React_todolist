import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/Todo";
import { v4 as uuidv4 } from "uuid";

const initialState = JSON.parse(localStorage.getItem("todos"))
  ? JSON.parse(localStorage.getItem("todos"))
  : ([] as Todo[]);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(state));
      },
      prepare: (description: string) => ({
        payload: {
          id: uuidv4(),
          description,
          completed: false,
        } as Todo,
      }),
    },
    editTodo(state, action) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].description = action.payload.value;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>,
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

export const { addTodo, removeTodo, editTodo, setTodoStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
