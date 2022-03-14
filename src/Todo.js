import React, { useContext, useState } from "react";
import { isLoggedContext } from "./App";
import AddBar from "./AddBar";

const Card = (props) => {
  const colors = ["#f3f4f6", "#fde047", "#fdba74", "#f87171"];
  return (
    <div
      className={`break-inside p-3 rounded shadow-lg mb-5`}
      style={{
        backgroundColor: colors[props.todo.priority],
      }}
    >
      <div className="title-text mb-2">
        <pre className="mb-2 font-bold">{props.todo.title}</pre>
        <div className="">
          <pre className="whitespace-pre-wrap">{props.todo.text}</pre>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <button className="p-2 h-9 w-9 inline-flex rounded-full transition-all active:bg-black/20 hover:bg-black/10 hover:shadow-md" title="edit">
            <i className="fas m-auto fa-pen-square"></i>
          </button>
          <button className="p-2 h-9 w-9 inline-flex rounded-full transition-all active:bg-black/20 hover:bg-black/10 hover:shadow-md" title="complete">
            <i className="fas m-auto fa-check-square"></i>
          </button>
          <button
            className="p-2 h-9 w-9 inline-flex rounded-full transition-all active:bg-black/20 hover:bg-black/10 hover:shadow-md"
            onClick={() => {
              // msnry.remove(this.parent().parent());
              props.removeTodo(props.todo.id);
            }}
            title="delete"
          >
            <i className="fas m-auto fa-times-circle"></i>
          </button>
        </div>

        {props.todo.deadline && (
          <div className="flex" title="countDown">
            <p className="text-xs m-auto bg-black/10 px-1 rounded-md py-0.5">{props.todo.deadline}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TodoList() {
  const isLogged = useContext(isLoggedContext);
  const [todos, setTodos] = useState([]);
  function getTodos() {
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/get.todo", {
      // Adding method type
      method: "POST",
      credentials: "include",
      // Adding body or contents to send
      body: JSON.stringify({
        active: true,
      }),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((json) => {
        const { message, results } = json;
        console.log(message);
        if (todos !== results) {
          setTodos(results);
        }
      });
  }
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/delete.todo", {
      // Adding method type
      method: "POST",
      credentials: "include",
      // Adding body or contents to send
      body: JSON.stringify({
        id: id,
        session_id: this.state.sessionId,
      }),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { message } = json;
        console.log(message);
      });
  }
  function addTodo(data) {
    let x = data.deadline;
    if (data.deadline) {
      data.deadline = new Date(data.deadline).toString();
    }
    const newTodos = [data, ...todos];
    setTodos(newTodos);
    if (data.deadline === null) {
      data.deadline = "";
    } else {
      data.deadline = x;
    }

    fetch("https://nandan1996-todo-flask-api.herokuapp.com/add.todo", {
      // Adding method type
      method: "POST",
      credentials: "include",

      // Adding body or contents to send
      body: JSON.stringify({
        deadline: data.deadline,
        priority: data.priority,
        text: data.text,
        title: data.title,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((json) => {
        const { id } = json;
        data["id"] = id;

        return true;
      });
  }

  if (isLogged) {
    getTodos();
  }
  return (
    <div className="grid grid-cols-1">
      {todos.map((todo) => (
        <Card
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          // updateTodo={props.updateTodo}
        />
      ))}
      <AddBar addTodo={addTodo} />
    </div>
  );
}
