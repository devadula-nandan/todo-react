import React, { Component } from "react";
import Todo from "./Todo";
const rng = (lower, upper) =>
  Math.floor(lower + (upper + 1 - lower) * Math.random());
class App extends Component {
  state = {
    session_id: "46a160ab-5973-492b-a8b2-fbe17de7d972",
    todos: [],
  };
  componentDidMount() {
    var payload = {
      active: true,
      priority: 0,
      session_id: session_id,
    };

    var data = new FormData();
    data.append("json", JSON.stringify(payload));

    fetch("https://nandan1996-todo-flask-api.herokuapp.com/get.todo", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((json) => {
        json.forEach((dict) => {
          dict.bgColor = `hsl(${rng(0, 360)}deg,${rng(20, 50)}%,${70}%)`;
        });
        this.setState({ todos: json });
      });
  }
  removeTodo = (index) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter((todo, i) => {
        return index !== i;
      }),
    });
    fetch(`https://jsonplaceholder.typicode.com/posts/${index}`, {
      method: "DELETE",
    });
  };
  render() {
    return <Todo todos={this.state.todos} removeTodo={this.removeTodo} />;
  }
}
export default App;
