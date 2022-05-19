import React, { useState, useEffect } from "react";
import Loading from "./Loading";
// import { isLoggedContext } from "./App";

export default function Login(props) {
  // const isLogged = useContext(isLoggedContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  function handleChange(e) {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }
  useEffect(() => {
    setErr(false);
  }, [username, password]);
  function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { message } = data;
        if (message === "Logged in successfully") {
          window.location.href = "/";
        } else {
          setIsLoading(false);
          setErr("Username or password is incorrect");
        }
      });
  }
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-76px)]">
      <div className="m-4">
        <form>
          <div className="shadow-lg bg-white rounded-lg md:px-8 px-3 pt-6 pb-8 mb-4">
            <h3 className="text-teal-700 font-bold text-center mb-6">
              User Login
            </h3>
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
                Login
                {isLoading ? <Loading /> : null}
              </button>
            </div>
            {err && <p className="text-red-500 text-xs italic">{err}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
