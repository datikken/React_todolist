import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addTodo } from "../../store/todos/todosSlice";
import * as React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  todo: yup.string("Enter your todo").required("Field is required"),
});

function TodoForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addTodo(values.todo));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        style={{ textAlign: "center", margin: "0 0 20px 0" }}
        variant="h3"
      >
        Todo list
      </Typography>
      <TextField
        variant="outlined"
        label="Todo"
        fullWidth
        id="todo"
        name="todo"
        value={formik.values.todo}
        onChange={formik.handleChange}
        error={formik.touched.todo && Boolean(formik.errors.todo)}
        helperText={formik.touched.todo && formik.errors.todo}
        style={{ margin: "0 0 20px 0" }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0 0 20px 0" }}
        type="submit"
      >
        Add Item
      </Button>
    </form>
  );
}

export default TodoForm;
