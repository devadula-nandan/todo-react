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
    <form className="mb-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <div className="grid grid-cols-1 gap-2 h-fit">
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
            className="bg-teal-100 p-3 rounded-3xl shadow-sm focus:border-teal-800 focus:ring-0 text-teal-900 placeholder:text-teal-600 border-teal-200 border-2"
            value={formData.title}
          ></input>
          <textarea
            style={{ minHeight: "52px", height: "52px" }}
            className="bg-teal-100 h-14 p-3 rounded-3xl shadow-sm focus:border-teal-800 focus:ring-0 text-teal-900 placeholder:text-teal-600 border-teal-200 border-2"
            rows="3"
            type="text"
            name="text"
            onChange={handleInputChange}
            placeholder="Text"
            value={formData.text}
          ></textarea>
        </div>
        <div className="grid grid-cols-1 gap-2 h-fit">
          <div className="grid grid-cols-4 gap-2 py-0.5">
            <input
              type="radio"
              defaultChecked
              className="border-gray-300 border-2 shadow-sm text-gray-300 h-12 w-full rounded-3xl checked:bg-none mx-auto focus:ring-gray-200"
              name="priority"
              onChange={handleInputChange}
              id="secondary-outlined"
              defaultValue="0"
              autoComplete="off"
            />
            <input
              type="radio"
              className="border-yellow-300 border-2 shadow-sm text-yellow-300 h-12 w-full rounded-3xl checked:bg-none mx-auto focus:ring-yellow-200"
              name="priority"
              onChange={handleInputChange}
              id="primary-outlined"
              defaultValue="1"
              autoComplete="off"
            />
            <input
              type="radio"
              className="border-orange-300 border-2 shadow-sm text-orange-300 h-12 w-full rounded-3xl checked:bg-none mx-auto focus:ring-orange-200"
              name="priority"
              onChange={handleInputChange}
              id="warning-outlined"
              defaultValue="2"
              autoComplete="off"
            />
            <input
              type="radio"
              className="border-red-300 border-2 shadow-sm text-red-300 h-12 w-full rounded-3xl checked:bg-none mx-auto focus:ring-red-200"
              name="priority"
              onChange={handleInputChange}
              id="danger-outlined"
              defaultValue="3"
              autoComplete="off"
            />
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2 h-fit">
            <input
              className="bg-teal-100 transition-all p-3 rounded-3xl shadow-sm focus:border-teal-800 focus:ring-0 text-teal-900 placeholder:text-teal-600 border-teal-200 border-2"
              type="datetime-local"
              onChange={handleInputChange}
              id="schedule"
              name="deadline"
              min="2021-06-21T00:00"
              max="2031-06-21T00:00"
              placeholder="Deadline"
            ></input>

            <button
              type="submit"
              onClick={addTodo}
              className="text-teal-800 m-auto rounded-3xl bg-teal-300 hover:bg-teal-400 hover:shadow-2xl transition-all px-5 py-3"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
