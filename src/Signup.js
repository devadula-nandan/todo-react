import React, { useState } from "react";
// import { isLoggedContext } from "./App";

export default function Signup(props) {
  // const isLogged = useContext(isLoggedContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  function handleChange(e) {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ username, password, name }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { message } = data;
        if (message === "new user account created.") {
          window.location.href = "/";
        } else {
          setErr("Username already exists");
        }
      });
  }
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-76px)]">
      <form>
        <div className="shadow-lg bg-white rounded-lg md:px-8 px-3 pt-6 pb-8 mb-4">
          <h3 className="text-teal-700 font-bold text-center mb-6">
            User Sign Up
          </h3>
          <div className="mb-4">
            <input
              placeholder="Name"
              className="bg-slate-50 appearance-none border-0 focus:ring-0 rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Username"
              className="bg-slate-50 appearance-none border-0 focus:ring-0 rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <input
              placeholder="Password"
              className="bg-slate-50 appearance-none border-0 focus:ring-0 rounded w-full py-2 px-3 text-teal-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-slate-50 m-auto rounded-3xl bg-teal-700 hover:bg-teal-600 active:bg-teal-500 hover:shadow-2xl transition-all px-4 py-2"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          {err && <p className="text-red-500 text-xs italic">{err}</p>}
        </div>
      </form>
    </div>
  );
}
