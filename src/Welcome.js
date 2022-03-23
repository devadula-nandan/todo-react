import React from "react";

export default function Welcome() {
  return (
    <div>
      <h1>Welcome to my Todo app</h1>
      <button onClick={() => (window.location.href = "/signup")}>signup</button>
      <button onClick={() => (window.location.href = "/login")}>Login</button>
    </div>
  );
};
