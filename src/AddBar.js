import React, { useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";
axios.defaults.withCredentials = true;

export default function Form(props) {
  const [formData, setFormData] = useState({
    text: "",
    title: "",
    priority: 0,
    deadline: "",
  });

  function addTodo(e) {
    e.preventDefault();
    if (formData.text && formData.title) {
      axios
        .post(
          "https://nandan1996-todo-flask-api.herokuapp.com/add.todo",
          formData
        )
        .then((res) => {
          if(props.activeTab === 'all' || props.activeTab === formData.priority){
          props.setTodos([
            {
              id: res.data.id,
              ...formData,
            },
            ...props.todos,
          ]);
          }
          setFormData({ text: "", title: "", priority: 0, deadline: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleInputChange(e) {
    e.target.type === "radio"
      ? setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="container mx-auto">
        <div className="mt-8 rounded overflow-hidden">
          <div
            className="group outline-none accordion-section mb-2"
            tabIndex="1"
          >
            <div className="flex px-3 sm:px-7 pt-4 lg:px-8">
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                placeholder="Title"
                value={formData.title}
                autoComplete="off"
                className="
                    shadow
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
              />
              <button
                type="submit"
                onClick={addTodo}
                className="p-2.5 ml-2 text-sm font-medium text-white bg-teal-400 rounded-lg dark:bg-teal-400 hover:bg-teal-500 active:bg-teal-600 shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" fill-gray-600"
                  height="24"
                  width="24"
                >
                  <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19Z" />
                </svg>
              </button>
            </div>
            <div className="group-focus-within:max-h-screen max-h-0 px-3 sm:px-7 lg:px-8 overflow-hidden ease duration-500">
              <textarea
                className="
                    mt-2 shadow
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                    min-h-[2.6rem]
                  "
                rows="3"
                type="text"
                name="text"
                onChange={handleInputChange}
                placeholder="Text"
                value={formData.text}
              ></textarea>
              <div className="flex my-2 ">
                <input
                  type="radio"
                  className="border-gray-300 border-2 text-gray-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-gray-200 shadow"
                  name="priority"
                  onChange={handleInputChange}
                  id="secondary-outlined"
                  defaultValue="0"
                  autoComplete="off"
                  {...(formData.priority === 0 && { checked: true })}
                />
                <input
                  type="radio"
                  className="border-yellow-300 border-2 text-yellow-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-yellow-200 shadow"
                  name="priority"
                  onChange={handleInputChange}
                  id="primary-outlined"
                  defaultValue="1"
                  autoComplete="off"
                  {...(formData.priority === 1 && { checked: true })}
                />
                <input
                  type="radio"
                  className="border-orange-300 border-2 text-orange-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-orange-200 shadow"
                  name="priority"
                  onChange={handleInputChange}
                  id="warning-outlined"
                  defaultValue="2"
                  autoComplete="off"
                  {...(formData.priority === 2 && { checked: true })}
                />
                <input
                  type="radio"
                  className="border-red-300 border-2 text-red-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-red-200 shadow"
                  name="priority"
                  onChange={handleInputChange}
                  id="danger-outlined"
                  defaultValue="3"
                  autoComplete="off"
                  {...(formData.priority === 3 && { checked: true })}
                />
                <input
                  type="datetime-local"
                  onChange={handleInputChange}
                  id="schedule"
                  name="deadline"
                  min="2021-06-21T00:00"
                  max="2031-06-21T00:00"
                  placeholder="Deadline"
                  // value={
                  //   // use today as default value if no deadline is set
                  //   formData.deadline ||
                  //   // create new date and add timezone offset
                  //   new Date(
                  //     new Date().getTime() +
                  //       new Date().getTimezoneOffset() * 60000 -
                  //       3600000
                  //   )
                  //     .toISOString()
                  //     .slice(0, 16)
                  // }
                  className="
                  ml-2
                    block shadow
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
