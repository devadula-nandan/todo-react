import React, { Component } from "react";

class AddBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      priority: 0,
      deadline: null,
      sessionId: props.sessionId,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <form className="mb-6">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <div className="grid grid-cols-1 gap-2 h-fit">
            <input type="text" name="title" onChange={this.handleInputChange} placeholder="Add Todo Title" className="bg-lime-100 p-3 rounded-md shadow-sm focus:border-lime-800 focus:ring-0 text-lime-900 placeholder:text-lime-600 border-lime-200 border-2" value={this.state.title}></input>
            <textarea style={{ minHeight: "52px", height: "52px" }} className="bg-lime-100 h-14 p-3 rounded-md shadow-sm focus:border-lime-800 focus:ring-0 text-lime-900 placeholder:text-lime-600 border-lime-200 border-2" rows="3" type="text" name="text" onChange={this.handleInputChange} placeholder="Add Todo Text" value={this.state.text}></textarea>
          </div>
          <div className="grid grid-cols-1 gap-2 h-fit">
            <div className="grid grid-cols-4 gap-2 py-0.5">
              <input type="radio" className="border-gray-300 border-2 shadow-sm text-gray-300 h-12 w-full rounded checked:bg-none mx-auto focus:ring-gray-200" name="priority" onChange={this.handleInputChange} id="secondary-outlined" defaultValue="0" autoComplete="off" />
              <input type="radio" className="border-yellow-300 border-2 shadow-sm text-yellow-300 h-12 w-full rounded checked:bg-none mx-auto focus:ring-yellow-200" name="priority" onChange={this.handleInputChange} id="primary-outlined" defaultValue="1" autoComplete="off" />
              <input type="radio" className="border-orange-300 border-2 shadow-sm text-orange-300 h-12 w-full rounded checked:bg-none mx-auto focus:ring-orange-200" name="priority" onChange={this.handleInputChange} id="warning-outlined" defaultValue="2" autoComplete="off" />
              <input type="radio" className="border-red-300 border-2 shadow-sm text-red-300 h-12 w-full rounded checked:bg-none mx-auto focus:ring-red-200" name="priority" onChange={this.handleInputChange} id="danger-outlined" defaultValue="3" autoComplete="off" />
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-2 h-fit">
              <input className="bg-lime-100 p-3 rounded-md shadow-sm focus:border-lime-800 focus:ring-0 text-lime-900 placeholder:text-lime-600 border-lime-200 border-2" type="datetime-local" onChange={this.handleInputChange} id="schedule" name="deadline" min="2021-06-21T00:00" max="2031-06-21T00:00"></input>

              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  this.props.addTodo(this.state);
                  this.setState({
                    text: "",
                    title: "",
                    priority: 0,
                    deadline: null,
                  });
                }}
                className="w-full bg-lime-500 text-lime-100 p-3 transition-all hover:bg-opacity-80 rounded-md shadow-sm focus:border-lime-800 focus:ring-0 border-lime-700 border-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
export default AddBar;
