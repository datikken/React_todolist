import * as React from "react";
import { DataGrid, GridColumns, GridCellParams } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { editTodo, removeTodo, setTodoStatus } from "../store/todos/todosSlice";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function TodoList(): JSX.Element {
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const handleCellValueChange = (data) => {
    dispatch(editTodo({ id: data.id, value: data.props.value }));
  };

  const columns: GridColumns = [
    { field: "id", headerName: "Id", width: 100, editable: false },
    {
      field: "description",
      headerName: "Description",
      width: 400,
      editable: true,
    },
    {
      field: "completed",
      headerName: "Completed",
      sortable: false,
      width: 140,
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => {
        return (
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            defaultChecked={params.row.completed}
            onChange={() =>
              dispatch(
                setTodoStatus({
                  completed: !params.row.completed,
                  id: params.row.id,
                }),
              )
            }
          />
        );
      },
    },
    {
      field: "remove",
      headerName: "Remove",
      sortable: false,
      width: 140,
      disableClickEventBubbling: false,
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => {
        return (
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(removeTodo(params.row.id));
            }}
          >
            <DeleteIcon index={params.row.id} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={todoList}
        columns={columns}
        hideFooter={true}
        onEditCellChange={(data) => handleCellValueChange(data)}
      />
    </div>
  );
}

export default TodoList;
