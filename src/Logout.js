import React, { Component } from "react";
import ResponsiveNavBar from "./Nav";
const handleLogout = () => {
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
  localStorage.removeItem("session");
};

function Logout() {
  handleLogout();
  window.location.href = "/";
}
export default Logout;
