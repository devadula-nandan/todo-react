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
    <div className="break-inside-avoid p-1.5">
      <div
        className={
          "p-3 rounded shadow " +
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
                  onClick={() => {
                    props.setShowModal(true);
                    props.setEditData({
                      title: props.todo.title,
                      text: props.todo.text,
                      priority: props.todo.priority,
                      deadline: new Date(props.todo.deadline)
                        .toISOString()
                        .slice(0, 16),
                      id: props.todo.id,
                    });
                  }}
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
            {props.todo.priority < 0 && (
              <button
                onClick={() => {
                  axios
                    .post(
                      "https://nandan1996-todo-flask-api.herokuapp.com/uncheck.todo",
                      {
                        id: props.todo.id,
                      }
                    )
                    .then((res) => {
                      props.setTodos(
                        props.todos.filter((todo) => todo.id !== props.todo.id)
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className="p-2 h-9 w-9 inline-flex rounded-full transition-all active:bg-black/20 hover:bg-black/10 hover:shadow-md"
                title="restore"
              >
                <i className="fas m-auto fa-check-square"></i>
              </button>
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
                              ? deadline.getMinutes() ===
                                new Date().getMinutes()
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
                                  deadline.getMinutes() -
                                  new Date().getMinutes()
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
    </div>
  );
};

export default function TodoList(props) {
  const isLogged = props.isLogged;
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [editData, setEditData] = useState({});
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
      <AddBar setTodos={setTodos} todos={todos} activeTab={activeTab} />
      <div className="md:container md:mx-auto sm:px-4 lg:px-5">
        <div className="flex px-3">
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
                  setActiveTab("all");
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
                  setActiveTab(0);
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
                  setActiveTab(1);
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
                  setActiveTab(2);
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
                  setActiveTab(3);
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
                  setActiveTab(-1);
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

        <div className="md:container md:mx-auto columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-0 px-1.5 pb-5">
          <>
            {showModal ? (
              <>
                <div className="justify-center backdrop-blur items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl px-3">
                    {/*content*/}
                    <div
                      className={
                        "border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none " +
                        (editData.priority === 0
                          ? "bg-gray-100"
                          : editData.priority === 1
                          ? "bg-yellow-300"
                          : editData.priority === 2
                          ? "bg-orange-300"
                          : editData.priority === 3
                          ? "bg-red-300"
                          : "bg-green-300")
                      }
                    >
                      {/*header*/}
                      <div className="flex items-start justify-between px-2 pt-2 rounded-t">
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                          className="
                          bg-transparent focus:outline-none border-0 rounded-lg py-2 px-3 block w-full leading-normal focus:ring-0 font-semibold text-xl
                        "
                        />
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => {
                            setShowModal(false);
                            setEditData({});
                          }}
                        >
                          <span className="bg-transparent text-black leading-6 h-6 w-6 block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative px-2 flex-auto">
                        <textarea
                          value={editData.text}
                          onChange={(e) =>
                            setEditData({ ...editData, text: e.target.value })
                          }
                          className="
                          bg-transparent focus:outline-none border-0 rounded-lg py-2 px-3 block w-full leading-normal focus:ring-0 font-semibold text-sm 
                        "
                        />
                      </div>
                      <div className="relative px-2 flex-auto">
                        <input
                          type="datetime-local"
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              deadline: e.target.value,
                            })
                          }
                          value={editData.deadline}
                          id="schedule"
                          name="deadline"
                          min="2021-06-21T00:00"
                          max="2031-06-21T00:00"
                          placeholder="Deadline"
                          className=" bg-transparent focus:outline-none border-0 rounded-lg py-2 px-3 block w-full leading-normal focus:ring-0 font-semibold text-md"
                        />
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-between px-2 pb-2 rounded-b">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            {...(editData.priority === 0 && { checked: true })}
                            className="border-gray-300 border-2 text-gray-300 h-9 w-9 rounded-3xl checked:bg-none mr-2 focus:ring-gray-200 shadow"
                            name="priority"
                            onChange={() =>
                              setEditData({ ...editData, priority: 0 })
                            }
                            id="secondary-outlined"
                            defaultValue="0"
                            autoComplete="off"
                          />
                          <input
                            type="radio"
                            {...(editData.priority === 1 && { checked: true })}
                            className="border-yellow-300 border-2 text-yellow-300 h-9 w-9 rounded-3xl checked:bg-none mr-2 focus:ring-yellow-200 shadow"
                            name="priority"
                            onChange={() =>
                              setEditData({ ...editData, priority: 1 })
                            }
                            id="primary-outlined"
                            defaultValue="1"
                            autoComplete="off"
                          />
                          <input
                            type="radio"
                            {...(editData.priority === 2 && { checked: true })}
                            className="border-orange-300 border-2 text-orange-300 h-9 w-9 rounded-3xl checked:bg-none mr-2 focus:ring-orange-200 shadow"
                            name="priority"
                            onChange={() =>
                              setEditData({ ...editData, priority: 2 })
                            }
                            id="warning-outlined"
                            defaultValue="2"
                            autoComplete="off"
                          />
                          <input
                            type="radio"
                            {...(editData.priority === 3 && { checked: true })}
                            className="border-red-300 border-2 text-red-300 h-9 w-9 rounded-3xl checked:bg-none mr-2 focus:ring-red-200 shadow"
                            name="priority"
                            onChange={() =>
                              setEditData({ ...editData, priority: 3 })
                            }
                            id="danger-outlined"
                            defaultValue="3"
                            autoComplete="off"
                          />
                        </div>
                        <button
                          className="bg-teal-400 text-gray-600 active:bg-teal-500 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                          type="button"
                          onClick={
                            () => {
                              axios
                                .post(
                                  "https://nandan1996-todo-flask-api.herokuapp.com/update.todo",
                                  editData
                                )
                                .then((res) => {
                                  console.log(res);
                                  // mutate todos and change the todo that is being edited
                                  setTodos(
                                    todos.map((todo) => {
                                      todo.id === editData.id &&
                                        (todo = editData);
                                      return todo;
                                    })
                                  );
                                  setShowModal(false);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }
                            // https://nandan1996-todo-flask-api.herokuapp.com/update.todo
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
          {todos.map((todo) => (
            <Card
              editData={editData}
              setEditData={setEditData}
              setShowModal={setShowModal}
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              checkTodo={checkTodo}
              setTodos={setTodos}
              todos={todos}
              // updateTodo={props.updateTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
