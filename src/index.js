import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import NotFound from "./NotFound";
import Login from "./Login";
import Todo from "./Todo";
import Welcome from "./Welcome";
import "./index.css";
import Signup from "./Signup";

// export const isLoggedContext = React.createContext(false);
export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (isLogged === false) {
      fetch("https://nandan1996-todo-flask-api.herokuapp.com/verify.session", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const { message } = data;
          if (message !== "False") {
            setIsLogged(message);
          } else {
            if (window.location.pathname !== "/login" && isLogged === false) {
              window.location.href = "/login";
            }
          }
        });
    }
  }, [isLogged]);
  return (
    // <isLoggedContext.Provider value={isLogged}>
    <Router>
      <Layout isLogged={isLogged} setIsLogged={setIsLogged}>
        <Routes>
          {isLogged ? <Route path="/" element={<Todo isLogged={isLogged} />} /> : <Route path="/" element={<Welcome />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
    // </isLoggedContext.Provider>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
