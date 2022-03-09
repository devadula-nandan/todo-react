import React, { Component } from "react";

class LoginCard extends Component {
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
      <div className="grid grid-cols-1 gap-2 h-fit">
        <div className="grid grid-cols-1 gap-2 h-fit">
          <input type="text" name="username" onChange={this.handleChange} placeholder="Username" className="bg-lime-100 p-3 rounded-md shadow-sm focus:border-lime-800 focus:ring-0 text-lime-900 placeholder:text-lime-600 border-lime-200 border-2" value={username} />
          <input type="text" name="password" onChange={this.handleChange} placeholder="Password" className="bg-lime-100 p-3 rounded-md shadow-sm focus:border-lime-800 focus:ring-0 text-lime-900 placeholder:text-lime-600 border-lime-200 border-2" value={password} />
          <button onClick={this.handleSubmit} className="bg-lime-100 p-3 rounded-md shadow-sm focus:border-lime-800 focus:ring-0 text-lime-900 placeholder:text-lime-600 border-lime-200 border-2">
            {" "}
            Login{" "}
          </button>
        </div>
      </div>
    );
  }
}
export default LoginCard;
