import React, { Component } from "react";
import Masonry from "react-masonry-css";

const Card = (props) => {
  const colors = ["#f2f2f2", "#ffff60", "#ffab5b", "#ff5656"];
  return (
    <div
      className={`card grid-item shadow`}
      style={{
        backgroundColor: colors[props.todo.priority],
      }}
    >
      <div className="titleText">
        <p className="title m-0">{props.todo.title}</p>
        <p className="text m-0">{props.todo.text}</p>
      </div>
      <div className="controls">
        <button className="btn edit p-3 rounded-circle" title="edit">
          <i className="fas fa-pen-square"></i>
        </button>
        <button className="btn complete p-3 rounded-circle" title="complete">
          <i className="fas fa-check-square"></i>
        </button>
        <button
          className="btn delete p-3 rounded-circle"
          onClick={() => {
            // msnry.remove(this.parent().parent());
            props.removeTodo(props.todo.id);
          }}
          title="delete"
        >
          <i className="fas fa-times-circle"></i>
        </button>
        {props.todo.deadline && (
          <div className="countDown" title="countDown">
            <p className="countDownText m-0">{props.todo.deadline}</p>
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
      <div className="container px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {cards}
        </Masonry>
      </div>
    );
  }
}
export default Todo;
