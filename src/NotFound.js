import React from "react";
import { Link } from "react-router-dom";
import ResponsiveNavBar from "./Nav";
//create a 404 page for the app to render
const NotFound = () => {
  return (
    <>
      <ResponsiveNavBar />
      <div className="h-screen w-screen bg-lime-200 flex flex-col">
        <h1 className="text-lime-800 mb-10 mt-auto mx-auto lg:text-6xl md:text-4xl sm:text-3xl text-2xl text-center drop-shadow-2xl">404 Page Not Found</h1>
        <svg height={80} className="text-lime-800 mb-8 mx-auto lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#3f6212"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
          />
        </svg>
        <p className="text-lime-800 mx-auto mb-10 lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center drop-shadow-2xl">Sorry, the page you are looking for does not exist.</p>

        <Link to="/" className="text-lime-800 m-auto rounded-3xl bg-lime-300 hover:bg-lime-400 hover:shadow-2xl transition-all px-4 py-2">
          {" "}
          Go Back Home
        </Link>
      </div>
    </>
  );
};
export default NotFound;
