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
          this.props.logIn;
          this.setState({
            username: "",
            password: "",
          });
        });
    }
  };

  render() {
    const { logIn } = this.props.logIn;
    const { username, password } = this.state;
    return (
      // create a login card with a form to login and a button to logout in tailwind css
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" name="username" value={username} onChange={this.handleChange} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(this.handleSubmit, logIn(true))}>
              Sign In
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginCard;
