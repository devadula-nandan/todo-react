import React from "react";

export default function Welcome() {
  return (
    <div className="flex flex-col h-[calc(100vh-76px)] align-middle justify-evenly px-4">
      <h1 className=" text-teal-700 text-4xl font-extrabold text-center">Welcome to my Todo app</h1>
      <div className="flex align-middle justify-center">
        <button className="text-teal-800 rounded-3xl mr-3 bg-teal-300 hover:bg-teal-400 hover:shadow-2xl transition-all px-4 py-2" onClick={() => (window.location.href = "/signup")}>
          signup
        </button>
        <button className="text-teal-800 rounded-3xl bg-teal-300 hover:bg-teal-400 hover:shadow-2xl transition-all px-4 py-2" onClick={() => (window.location.href = "/login")}>
          Login
        </button>
      </div>
    </div>
  );
}
