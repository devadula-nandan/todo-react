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
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* <!-- Website Logo --> */}

              <Link to="/" className="flex items-center py-4">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  height={20}
                  width={20}
                  viewBox="0 0 297 297"
                  style={{
                    enableBackground: "new 0 0 297 297",
                    fill: "#6b7280",
                  }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M237.333,33h-50.14c-2.558-18.613-18.556-33-37.86-33s-35.303,14.387-37.86,33h-51.14C50.408,33,42,41.075,42,51v228
		c0,9.925,8.408,18,18.333,18h177c9.925,0,17.667-8.075,17.667-18V51C255,41.075,247.258,33,237.333,33z M93.052,48
		c3.432,18.033,19.084,31,38.092,31h36.379c19.008,0,34.66-12.967,38.092-31H223v216H75V48H93.052z M149.333,16
		c10.456,0,19.242,7.259,21.601,17h-43.201C130.091,23.259,138.877,16,149.333,16z"
                    />
                    <rect x="99" y="109" width="50" height="15" />
                    <polygon points="200.689,105.076 189.645,94.924 175.427,110.39 169.237,105.347 159.763,116.976 176.907,130.944 	" />
                    <rect x="99" y="157" width="50" height="15" />
                    <polygon points="200.689,153.076 189.645,142.924 175.427,158.39 169.237,153.347 159.763,164.976 176.907,178.944 	" />
                    <rect x="99" y="205" width="50" height="15" />
                    <polygon points="200.689,201.076 189.645,190.924 175.427,206.39 169.237,201.347 159.763,212.976 176.907,226.944 	" />
                  </g>
                </svg>
                <span className="font-semibold text-gray-500 text-lg ml-2">
                  Todo
                </span>
              </Link>
            </div>
            {/* <!-- Primary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-1">
              {/* <Link
                to="/todo"
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              >
                Todo
              </Link> */}
            </div>
          </div>
          {/* <!-- Secondary Navbar items --> */}
          <div className="hidden md:flex items-center space-x-3 ">
            {links.map((link) => (
              <Link
                key={link}
                to={
                  link === "Logout"
                    ? "/"
                    : link === "Login"
                    ? "/login"
                    : "/signup"
                }
                className="text-slate-50 m-auto rounded-3xl bg-teal-700 hover:bg-teal-600 active:bg-teal-500 hover:shadow-2xl transition-all px-4 py-2"
                {...(link === "Logout" ? { onClick: handleLogout } : {})}
              >
                {link}
              </Link>
            ))}
          </div>
          {/* <!-- Mobile menu button --> */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => navRef.current.classList.toggle("hidden")}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <!-- mobile menu --> */}
      <div ref={navRef} className="hidden mobile-menu">
        <ul className="">
          <li className="active">
            <a
              href="index.html"
              className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      {/* <script>
				const btn = document.querySelector("button.mobile-menu-button");
				const menu = document.querySelector(".mobile-menu");

				btn.addEventListener("click", () => {
					menu.classList.toggle("hidden");
				});
			</script> */}
    </nav>

    // <nav ref={navRef} className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    //   <div className="flex items-center flex-shrink-0 text-white mr-6">
    //     <Link to="/" className="font-semibold text-xl tracking-tight">
    //       Home
    //     </Link>
    //   </div>
    //   <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    //     <div className="text-sm">
    //       {links.map((link) => (
    //         <Link key={link} to={link === "Logout" ? "/" : link === "Login" ? "/login" : "/signup"} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" {...(link === "Logout" ? { onClick: handleLogout } : {})}>
    //           {link}
    //         </Link>
    //       ))}
    //     </div>
    //     <div className="flex-grow flex flex-row justify-end">
    //       <p className="text-white">{isLogged ? "Logged in as " + isLogged : ""}</p>
    //     </div>
    //   </div>
    // </nav>
  );
};
export default Nav;
