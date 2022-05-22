import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { isLoggedContext } from "./index";
import AddBar from "./AddBar";
import { data } from "autoprefixer";
axios.defaults.withCredentials = true;

const Card = (props) => {
  const d = new Date(props.todo.deadline + "+0530");
  const [deadline, setDeadline] = useState(undefined);
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
        "break-inside-avoid p-3 rounded shadow mb-5 " +
        (props.todo.priority === 0
          ? "bg-gray-100"
          : props.todo.priority === 1
          ? "bg-yellow-300"
          : props.todo.priority === 2
          ? "bg-orange-300"
          : props.todo.priority === 3
          ? "bg-red-300"
          : "bg-green-300")
      }
    >
      <div className="title-text mb-2">
        <pre className="whitespace-pre-wrap mb-2 font-bold text-lg cursor-default">
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
          {props.todo.priority >= 0 && (
            <>
              <button
                className="p-2 h-9 w-9 inline-flex rounded-full transition-all active:bg-black/20 hover:bg-black/10 hover:shadow-md"
                title="edit"
                onClick={() => props.setShowModal(true)}
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
            </>
          )}
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
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (isLogged) {
      getTodos({
        active: true,
      });
    }
  }, [isLogged]);
  const getTodos = (d) => {
    axios
      .post("https://nandan1996-todo-flask-api.herokuapp.com/get.todo", d)
      .then((res) => {
        const { message, results } = res.data;
        if (todos !== results) {
          setTodos(results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function removeTodo(i) {
    axios
      .delete("https://nandan1996-todo-flask-api.herokuapp.com/delete.todo", {
        data: {
          id: i,
        },
      })
      .then((res) => {
        setTodos(todos.filter((todo) => todo.id !== i));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function checkTodo(i) {
    axios
      .post("https://nandan1996-todo-flask-api.herokuapp.com/check.todo", {
        id: i,
      })
      .then((res) => {
        setTodos(todos.filter((todo) => todo.id !== i));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="md:container md:mx-auto">
      <AddBar setTodos={setTodos} todos={todos} />
      <div className="md:container md:mx-auto px-3 sm:px-7 lg:px-8">
        <div className="flex">
          <ul className="flex mb-2 rounded-lg shadow">
            <li className="flex">
              <input
                className="sr-only peer"
                type="radio"
                value="all"
                name="answer"
                id="all"
                defaultChecked
              />
              <label
                className="px-3 py-2 bg-gray-100 rounded-l-lg cursor-pointer font-semibold text-gray-600 focus:outline-none hover:bg-gray-200 peer-checked:bg-teal-400"
                for="all"
                onClick={() => {
                  getTodos({
                    active: true,
                  });
                }}
              >
                ALL
              </label>
            </li>

            <li className="flex">
              <input
                className="sr-only peer"
                type="radio"
                value="0"
                name="answer"
                id="0"
              />
              <label
                className="px-3 py-2 bg-gray-100 cursor-pointer font-semibold text-gray-600 focus:outline-none hover:bg-gray-200 peer-checked:bg-gray-300"
                for="0"
                onClick={() => {
                  getTodos({
                    active: true,
                    priority: 0,
                  });
                }}
              >
                0
              </label>
            </li>

            <li className="flex">
              <input
                className="sr-only peer"
                type="radio"
                value="1"
                name="answer"
                id="1"
              />
              <label
                className="px-3 py-2 bg-gray-100 cursor-pointer font-semibold text-gray-600 focus:outline-none hover:bg-gray-200 peer-checked:bg-yellow-300"
                for="1"
                onClick={() => {
                  getTodos({
                    active: true,
                    priority: 1,
                  });
                }}
              >
                1
              </label>
            </li>
            <li className="flex">
              <input
                className="sr-only peer"
                type="radio"
                value="2"
                name="answer"
                id="2"
              />
              <label
                className="px-3 py-2 bg-gray-100 cursor-pointer font-semibold text-gray-600 focus:outline-none hover:bg-gray-200 peer-checked:bg-orange-300"
                for="2"
                onClick={() => {
                  getTodos({
                    active: true,
                    priority: 2,
                  });
                }}
              >
                2
              </label>
            </li>
            <li className="flex">
              <input
                className="sr-only peer"
                type="radio"
                value="3"
                name="answer"
                id="3"
              />
              <label
                className="px-3 py-2 bg-gray-100 cursor-pointer font-semibold text-gray-600 focus:outline-none hover:bg-gray-100 peer-checked:bg-red-300"
                for="3"
                onClick={() => {
                  getTodos({
                    active: true,
                    priority: 3,
                  });
                }}
              >
                3
              </label>
            </li>
            <li className="flex">
              <input
                className="sr-only peer"
                type="radio"
                value="-1"
                name="answer"
                id="-1"
              />
              <label
                className="px-3 py-2 bg-gray-100 rounded-r-lg cursor-pointer font-semibold text-gray-600 focus:outline-none hover:bg-gray-100 peer-checked:bg-green-300"
                for="-1"
                onClick={() => {
                  getTodos({
                    active: true,
                    priority: -1,
                  });
                }}
              >
                completed
              </label>
            </li>
          </ul>
        </div>

        <div className="md:container md:mx-auto columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-5 pb-5">
          <>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Modal Title</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                          I always felt like I could do anything. That’s the
                          main thing people are controlled by! Thoughts- their
                          perception of themselves! They're slowed down by their
                          perception of themselves. If you're taught you can’t
                          do anything, you won’t do anything. I was taught I
                          could do everything.
                        </p>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </>
          {todos.map((todo) => (
            <Card
              setShowModal={setShowModal}
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              checkTodo={checkTodo}
              // updateTodo={props.updateTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
