import React, { Component } from "react";
import Todo from "./Todo";
const rng = (lower, upper) =>
  Math.floor(lower + (upper + 1 - lower) * Math.random());
class App extends Component {
  state = {
    todos: [],
  };
  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
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
