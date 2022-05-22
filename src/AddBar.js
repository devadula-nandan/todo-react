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
          props.setTodos([
            {
              id: res.data.id,
              ...formData,
            },
            ...props.todos,
          ]);
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
      <div class="container mx-auto">
        <div class="mt-8 rounded overflow-hidden">
          <div class="group outline-none accordion-section mb-2" tabindex="1">
            <div class="flex px-3 sm:px-7 pt-4 lg:px-8">
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
                class="p-2.5 ml-2 text-sm font-medium text-white bg-teal-400 rounded-lg dark:bg-teal-400 hover:bg-teal-700 active:bg-teal-900 shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className=" fill-gray-600" height="24" width="24">
                  <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19Z" />
                </svg>
              </button>
            </div>
            <div class="group-focus-within:max-h-screen max-h-0 px-3 sm:px-7 lg:px-8 overflow-hidden ease duration-500">
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
              <div class="flex my-2 ">
                <input
                  type="radio"
                  defaultChecked
                  className="border-gray-300 border-2 text-gray-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-gray-200 shadow"
                  name="priority"
                  onChange={handleInputChange}
                  id="secondary-outlined"
                  defaultValue="0"
                  autoComplete="off"
                />
                <input
                  type="radio"
                  className="border-yellow-300 border-2 text-yellow-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-yellow-200 shadow"
                  name="priority"
                  onChange={handleInputChange}
                  id="primary-outlined"
                  defaultValue="1"
                  autoComplete="off"
                />
                <input
                  type="radio"
                  className="border-orange-300 border-2 text-orange-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-orange-200 shadow"
                  name="priority"
                  onChange={handleInputChange}
                  id="warning-outlined"
                  defaultValue="2"
                  autoComplete="off"
                />
                <input
                  type="radio"
                  className="border-red-300 border-2 text-red-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-red-200 shadow"
                  name="priority"
                  onChange={handleInputChange}
                  id="danger-outlined"
                  defaultValue="3"
                  autoComplete="off"
                />
                <input
                  type="datetime-local"
                  onChange={handleInputChange}
                  id="schedule"
                  name="deadline"
                  min="2021-06-21T00:00"
                  max="2031-06-21T00:00"
                  placeholder="Deadline"
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
