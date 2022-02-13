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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((json) => {
        const { message, results } = json;
        console.log(message);
        this.setState({ todos: results });
      });
  }
  removeTodo = (id) => {
    const { todos } = this.state;
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
  addTodo = (data) => {
    const { todos } = this.state;

    fetch("https://nandan1996-todo-flask-api.herokuapp.com/add.todo", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        deadline: data.deadline,
        priority: data.priority,
        session_id: data.sessionId,
        text: data.text,
        title: data.title,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((json) => {
        console.log(json);
        const { id } = json;
        data["id"] = id;
        const newTodos = [data, ...todos];
        this.setState({
          todos: newTodos,
        });
        return true;
      });
  };
  render() {
    return (
      <div className="md:container md:mx-auto px-3 sm:px-7 pt-4 lg:px-8">
        <AddBar sessionId={this.state.sessionId} addTodo={this.addTodo} />
        <Todo todos={this.state.todos} removeTodo={this.removeTodo} />
      </div>
    );
  }
}
export default App;
