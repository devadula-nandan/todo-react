import React, { Component } from "react";
import Todo from "./Todo";
import AddBar from "./AddBar";
// import { useCookies } from "react-cookie"; for function bases
// import { withCookies } from "react-cookie";
import Login from "./Login";

class App extends Component {
  state = {
    isLoggedIn: false,
    todos: [],
  };
  componentDidMount() {
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/get.todo", {
      // Adding method type
      method: "POST",
      credentials: "include",

      // Adding body or contents to send
      body: JSON.stringify({
        active: true,
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
      credentials: "include",

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
  logIn = (value) => {
    this.setState({
      isLoggedIn: value,
    });
  };
  addTodo = (data) => {
    const { todos } = this.state;
    console.log(data.deadline);
    let x = data.deadline;
    if (data.deadline) {
      data.deadline = new Date(data.deadline).toString();
    }
    const newTodos = [data, ...todos];
    this.setState({
      todos: newTodos,
    });
    if (data.deadline === null) {
      data.deadline = "";
    } else {
      data.deadline = x;
    }

    fetch("https://nandan1996-todo-flask-api.herokuapp.com/add.todo", {
      // Adding method type
      method: "POST",
      credentials: "include",

      // Adding body or contents to send
      body: JSON.stringify({
        deadline: data.deadline,
        priority: data.priority,
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

        return true;
      });
  };
  render() {
    return (
      <div className="md:container md:mx-auto px-3 sm:px-7 pt-4 lg:px-8">
        {this.state.isLoggedIn && (
          <div>
            <Todo todos={this.state.todos} removeTodo={this.removeTodo} />
            <AddBar addTodo={this.addTodo} />
          </div>
        )}
        {this.state.isLoggedIn === false && <Login isLoggedIn={this.logIn} />}
      </div>
    );
  }
}
export default App;
