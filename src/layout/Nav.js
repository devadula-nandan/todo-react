import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// create a responsive navbar with links to each page and dynamic login/logout with tailwindcss classes
const Nav = (props) => {
  const isLogged = props.isLogged;
  console.log(isLogged);
  const [links, setLinks] = useState([]);
  const navRef = useRef(null);
  useEffect(() => {
    if (isLogged) {
      setLinks(["Logout"]);
    } else {
      setLinks(["signup", "Login"]);
    }
  }, [isLogged]);
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
        props.setIsLogged(false);
      });
  };
  return (
    <nav ref={navRef} className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          Home
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm">
          {links.map((link) => (
            <Link key={link} to={link === "Logout" ? "/" : link === "Login" ? "/login" : "/signup"} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" {...(link === "Logout" ? { onClick: handleLogout } : {})}>
              {link}
            </Link>
          ))}
        </div>
        <div className="flex-grow flex flex-row justify-end">
          <p className="text-white">{isLogged ? "Logged in as " + isLogged : ""}</p>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
