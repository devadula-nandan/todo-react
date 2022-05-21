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
        <div class="mt-8 mb-2 rounded overflow-hidden">
          <div class="group outline-none accordion-section" tabindex="1">
            <div class="flex">
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                placeholder="Title"
                value={formData.title}
                className="
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
                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  fill="white"
                >
                  <path d="M12 22.85Q9.725 22.85 7.75 22Q5.775 21.15 4.312 19.688Q2.85 18.225 2 16.25Q1.15 14.275 1.15 12Q1.15 9.725 2 7.75Q2.85 5.775 4.312 4.312Q5.775 2.85 7.75 2Q9.725 1.15 12 1.15Q14.275 1.15 16.25 2Q18.225 2.85 19.688 4.312Q21.15 5.775 22 7.75Q22.85 9.725 22.85 12Q22.85 14.275 22 16.25Q21.15 18.225 19.688 19.688Q18.225 21.15 16.25 22Q14.275 22.85 12 22.85ZM10.8 17.2H13.2V13.2H17.2V10.8H13.2V6.8H10.8V10.8H6.8V13.2H10.8Z" />
                </svg>
              </button>
            </div>
            <div class="group-focus-within:max-h-screen max-h-0 overflow-hidden ease duration-500">
              <textarea
                className="
                    mt-2
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
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
                  className="border-gray-300 border-2 shadow-sm text-gray-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-gray-200"
                  name="priority"
                  onChange={handleInputChange}
                  id="secondary-outlined"
                  defaultValue="0"
                  autoComplete="off"
                />
                <input
                  type="radio"
                  className="border-yellow-300 border-2 shadow-sm text-yellow-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-yellow-200"
                  name="priority"
                  onChange={handleInputChange}
                  id="primary-outlined"
                  defaultValue="1"
                  autoComplete="off"
                />
                <input
                  type="radio"
                  className="border-orange-300 border-2 shadow-sm text-orange-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-orange-200"
                  name="priority"
                  onChange={handleInputChange}
                  id="warning-outlined"
                  defaultValue="2"
                  autoComplete="off"
                />
                <input
                  type="radio"
                  className="border-red-300 border-2 shadow-sm text-red-300 h-12 w-12 rounded-3xl checked:bg-none ml-2 focus:ring-red-200"
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
                    block
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
