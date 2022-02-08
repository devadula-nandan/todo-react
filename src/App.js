Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@devadula-nandan 
devadula-nandan
/
todo-react
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
2
Insights
Settings
We found potential security vulnerabilities in your dependencies.
Only the owner of this repository can see this message.

todo-react/src/App.js /
@devadula-nandan
devadula-nandan Add files via upload
Latest commit d1eb676 23 days ago
 History
 1 contributor
34 lines (34 sloc)  951 Bytes
   
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
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
