import React, { useContext, useEffect, useState } from "react";
// import { isLoggedContext } from "./index";
import AddBar from "./AddBar";

const Card = (props) => {
  const d = new Date(props.todo.deadline + "+0530");
  const [deadline, setDeadline] = useState(
    new Date(props.todo.deadline + "+0530")
  );
  // decrement time every second to show time left
  useEffect(() => {
    const timer = setInterval(() => {
      d.setSeconds(d.getSeconds() - 1);
      setDeadline(d);
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);
  return (
    <div
      className={
        "break-inside p-3 rounded shadow-lg mb-5 " +
        (props.todo.priority === 0
          ? "bg-gray-200"
          : props.todo.priority === 1
          ? "bg-yellow-300"
          : props.todo.priority === 2
          ? "bg-orange-300"
          : "bg-red-300")
      }
    >
      <div className="title-text mb-2">
        <pre className="mb-2 font-bold text-lg cursor-default">
          {props.todo.title}
        </pre>
        <div className="">
          <pre className="whitespace-pre-wrap cursor-default">
            {props.todo.text}
          </pre>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2 -ml-2 -mb-2">
          <button
            className="p-2 h-9 w-9 inline-flex rounded-full transition-all active:bg-black/20 hover:bg-black/10 hover:shadow-md"
            title="edit"
          >
            <i className="fas m-auto fa-pen-square"></i>
          </button>
          <button
            onClick={() => props.checkTodo(props.todo.id)}
            className="p-2 h-9 w-9 inline-flex rounded-full transition-all active:bg-black/20 hover:bg-black/10 hover:shadow-md"
            title="complete"
          >
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
          <div className="flex" title={props.todo.deadline}>
            <p className="text-xs mt-auto ml-auto bg-black/10 px-1 rounded-md py-0.5 hover:bg-black/20 cursor-default">
              {
                // show years and months or months and days or days and hours or hours and minutes or minutes and seconds or seconds if the deadline is in future else show overdue
                deadline
                  ? deadline.getTime() > new Date().getTime()
                    ? deadline.getFullYear() === new Date().getFullYear()
                      ? deadline.getMonth() === new Date().getMonth()
                        ? deadline.getDate() === new Date().getDate()
                          ? deadline.getHours() === new Date().getHours()
                            ? deadline.getMinutes() === new Date().getMinutes()
                              ? deadline.getSeconds() ===
                                new Date().getSeconds()
                                ? "now"
                                : `${
                                    deadline.getSeconds() -
                                    new Date().getSeconds()
                                  }s`
                              : `${
                                  deadline.getMinutes() -
                                  new Date().getMinutes()
                                }m ${
                                  deadline.getSeconds() -
                                  new Date().getSeconds()
                                }s`
                            : `${
                                deadline.getHours() - new Date().getHours()
                              }h ${
                                deadline.getMinutes() - new Date().getMinutes()
                              }m`
                          : `${deadline.getDate() - new Date().getDate()}d ${
                              deadline.getHours() - new Date().getHours()
                            }h`
                        : `${deadline.getMonth() - new Date().getMonth()}m ${
                            deadline.getDate() - new Date().getDate()
                          }d`
                      : `${
                          deadline.getFullYear() - new Date().getFullYear()
                        }y ${deadline.getMonth() - new Date().getMonth()}m`
                    : "overdue"
                  : "loading..."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TodoList(props) {
  const isLogged = props.isLogged;
  const [todos, setTodos] = useState([]);
  console.log(isLogged);
  useEffect(() => {
    if (isLogged) {
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
  }, [isLogged]);
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/delete.todo", {
      // Adding method type
      method: "DELETE",
      credentials: "include",
      // Adding body or contents to send
      body: JSON.stringify({
        id: id,
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
    data.priority = Number(data.priority);
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
  function checkTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/check.todo", {
      // Adding method type
      method: "POST",
      credentials: "include",
      // Adding body or contents to send
      body: JSON.stringify({
        id: id,
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

  return (
    <div className="md:container md:mx-auto px-3 sm:px-7 pt-4 lg:px-8">
      <AddBar addTodo={addTodo} />
      <div className="md:container md:mx-auto masonry sm:masonry-sm md:masonry-md lg:masonry-lg">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            checkTodo={checkTodo}
            // updateTodo={props.updateTodo}
          />
        ))}
      </div>
    </div>
  );
}
