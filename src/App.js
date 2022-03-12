import React, { Component } from "react";
import Todo from "./Todo";
import AddBar from "./AddBar";
// import { useCookies } from "react-cookie"; for function bases
// import { withCookies } from "react-cookie";
import ResponsiveNavBar from "./Nav";

class App extends Component {
  state = {
    session: localStorage.getItem("session"),
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
          alert(res.status, res.statusText, res.url, res.ok, res.type, res.body, res.bodyUsed);
        }
      })
      .then((json) => {
        const { message, results } = json;
        alert(message);
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
        alert(json);
      });
  };

  addTodo = (data) => {
    const { todos } = this.state;
    alert(data.deadline);
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
        alert(json);
        const { id } = json;
        data["id"] = id;

        return true;
      });
  };
  render() {
    return (
      <>
        <ResponsiveNavBar />
        <div className="md:container md:mx-auto px-3 sm:px-7 pt-4 lg:px-8">
          {this.state.session && (
            <div>
              <AddBar addTodo={this.addTodo} />
              <Todo todos={this.state.todos} removeTodo={this.removeTodo} />
            </div>
          )}
        </div>
      </>
    );
  }
}
export default App;
