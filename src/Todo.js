import React, { Component } from "react";
import Masonry from "react-masonry-css";

const Card = (props) => {
  return (
    <div
      className={`card grid-item shadow`}
      style={{
        backgroundColor: props.todo.bgColor,
      }}
    >
      <div className="titleText">
        <p className="title m-0">{props.todo.title}</p>
        <p className="text m-0">{props.todo.body}</p>
      </div>
      <div className="controls">
        <button className="btn edit" title="edit">
          <i className="fas fa-pen-square"></i>
        </button>
        <button className="btn complete" title="complete">
          <i className="fas fa-check-square"></i>
        </button>
        <button
          className="btn delete"
          onClick={() => {
            // msnry.remove(this.parent().parent());
            props.removeTodo(props.index);
          }}
          title="delete"
        >
          <i className="fas fa-times-circle"></i>
        </button>
        <div className="countDown" title="countDown">
          <p className="countDownText m-0">9D 9H 9M</p>
        </div>
      </div>
    </div>
  );
};

class Todo extends Component {
  render() {
    const { todos, removeTodo } = this.props;
    const cards = todos.map((todo, index) => {
      return (
        <Card todo={todo} key={index} index={index} removeTodo={removeTodo} />
      );
    });
    const breakpointColumnsObj = {
      default: 4,
      1100: 3,
      767: 2,
      500: 1,
    };
    return (
      <div className="container-fluid px-4" style={{ maxWidth: 1200 }}>
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
