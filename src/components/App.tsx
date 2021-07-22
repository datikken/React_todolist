import * as React from "react";
import Container from "@material-ui/core/Container";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App(): JSX.Element {
  return (
    <Container maxWidth="lg">
      <TodoForm />
      <TodoList />
    </Container>
  );
}

export default App;
