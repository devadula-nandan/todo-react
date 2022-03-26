import React from "react";

export default function Welcome() {
  return (
    <div>
      <h1>Welcome to my Todo app</h1>
      <button className="text-teal-800 m-auto rounded-3xl bg-teal-300 hover:bg-teal-400 hover:shadow-2xl transition-all px-4 py-2" onClick={() => (window.location.href = "/signup")}>
        signup
      </button>
      <button className="text-teal-800 m-auto rounded-3xl bg-teal-300 hover:bg-teal-400 hover:shadow-2xl transition-all px-4 py-2" onClick={() => (window.location.href = "/login")}>
        Login
      </button>
    </div>
  );
}
