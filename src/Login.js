import React, { Component } from "react";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleLogout = () => {
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/logout", {
      // Adding method type
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };
  handleRegister = (e) => {
    e.preventDefault();
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/signup", {
      // Adding method type
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        is_admin: false,
        name: "",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      fetch("https://nandan1996-todo-flask-api.herokuapp.com/login", {
        // Adding method type
        method: "POST",
        credentials: "include",
        // Adding body or contents to send
        body: JSON.stringify({
          username: username,
          password: password,
        }),

        // Adding headers to the request
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log(res.headers.get("Set-Cookie"));
            return res.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((json) => {
          const { message } = json;
          console.log(message);
          this.setState({
            username: "",
            password: "",
          });
        });
    }
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </label>
          <br />
          <button className="btn" type="submit" value="Login" onClick={this.handleSubmit}>
            login
          </button>
          <button value="logout" onClick={this.handleLogout}>
            logout
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
