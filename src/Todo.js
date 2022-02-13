import React, { Component } from "react";
import Masonry from "react-masonry-css";

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
          <pre className="whitespace-pre-wrap" contentEditable="true">
            {props.todo.text}
          </pre>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <button
            className="p-2 h-9 w-9 inline-flex rounded-full transition-all active:bg-black/20 hover:bg-black/10 hover:shadow-md"
            title="edit"
          >
            <i className="fas m-auto fa-pen-square"></i>
          </button>
          <button
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
          <div className="flex" title="countDown">
            <p className="text-xs m-auto bg-black/10 px-1 rounded-md py-0.5">{`${
              props.todo.deadline.split(" ")[1]
            } ${props.todo.deadline.split(" ")[2]} ${
              props.todo.deadline.split(" ")[3]
            } ${props.todo.deadline.split(" ")[4].split(":")[0]}:${
              props.todo.deadline.split(" ")[4].split(":")[1]
            }`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

class Todo extends Component {
  render() {
    const { todos, removeTodo } = this.props;
    const cards = todos.map((todo) => {
      return <Card todo={todo} key={todo.id} removeTodo={removeTodo} />;
    });
    const breakpointColumnsObj = {
      default: 4,
      1100: 3,
      767: 2,
      500: 1,
    };
    return (
      <div className="md:container md:mx-auto masonry sm:masonry-sm md:masonry-md lg:masonry-lg">
        {cards}
      </div>
    );
  }
}
export default Todo;
