// create a login form with username and password fields and a submit button and a link to the register page
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
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      fetch("https://nandan1996-todo-flask-api.herokuapp.com/login", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
          username: username,
          password: password,
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
        </form>
      </div>
    );
  }
}
export default Login;
