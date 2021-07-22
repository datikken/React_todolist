import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addTodo } from "../store/todos/todosSlice";
import * as React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useState } from "react";

function TodoForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [todoDescription, setTodoDescription] = useState("");

  return (
    <form>
      <Typography
        style={{ textAlign: "center", margin: "0 0 20px 0" }}
        variant="h3"
      >
        Todo list
      </Typography>
      <TextField
        variant="outlined"
        label="To Do Item"
        fullWidth
        onChange={(e) => setTodoDescription(e.target.value)}
        value={todoDescription}
        style={{ margin: "0 0 20px 0" }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0 0 20px 0" }}
        onClick={() => {
          dispatch(addTodo(todoDescription));
          setTodoDescription("");
        }}
      >
        Add Item
      </Button>
    </form>
  );
}

export default TodoForm;
