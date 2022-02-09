import React, { Component } from "react";
import Todo from "./Todo";
import AddBar from "./AddBar";
// const rng = (lower, upper) =>
//   Math.floor(lower + (upper + 1 - lower) * Math.random());
class App extends Component {
  state = {
    sessionId: "18f8c78d-531c-47a7-9413-97e835c295fa",
    todos: [],
  };
  componentDidMount() {
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/get.todo", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        active: true,
        session_id: this.state.sessionId,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { message, results } = json;
        console.log(message);
        this.setState({ todos: results });
      });
  }
  removeTodo = (id) => {
    const { todos } = this.state;
    console.log(todos);
    this.setState({
      todos: todos.filter((todo) => todo.id !== id),
    });
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/delete.todo", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        id: id,
        session_id: this.state.sessionId,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };
  render() {
    return (
      <div className="container">
        <AddBar />
        <Todo todos={this.state.todos} removeTodo={this.removeTodo} />
      </div>
    );
  }
}
export default App;
