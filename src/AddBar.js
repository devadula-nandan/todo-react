import React, { Component } from "react";

class AddBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      priority: 0,
      deadline: "",
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
      <form>
        <div className="row my-5 mx-2">
          <div className="col-md-6">
            <input
              type="text"
              name="title"
              onChange={this.handleInputChange}
              placeholder="Add Todo Title"
              className="form-control mb-3"
            ></input>
            <textarea
              className="form-control mb-3"
              rows="3"
              type="text"
              name="text"
              onChange={this.handleInputChange}
              placeholder="Add Todo Text"
            ></textarea>
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="radio"
              className="btn-check mb-3"
              name="priority"
              onChange={this.handleInputChange}
              id="secondary-outlined"
              defaultValue="0"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-secondary rounded w-25 mb-3"
              htmlFor="secondary-outlined"
            >
              none
            </label>

            <input
              type="radio"
              className="btn-check mb-3"
              name="priority"
              onChange={this.handleInputChange}
              id="primary-outlined"
              defaultValue="1"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-primary rounded w-25 mb-3"
              htmlFor="primary-outlined"
            >
              low
            </label>
            <input
              type="radio"
              className="btn-check mb-3"
              name="priority"
              onChange={this.handleInputChange}
              id="warning-outlined"
              defaultValue="2"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-warning rounded w-25 mb-3"
              htmlFor="warning-outlined"
            >
              mid
            </label>
            <input
              type="radio"
              className="btn-check mb-3"
              name="priority"
              onChange={this.handleInputChange}
              id="danger-outlined"
              defaultValue="3"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-danger rounded w-25 mb-3"
              htmlFor="danger-outlined"
            >
              high
            </label>
            <div className="row">
              <div className="col-md-7 mb-3">
                <input
                  className="h-100 w-100 border text-secondary rounded outline-none px-3 py-2"
                  type="datetime-local"
                  onChange={this.handleInputChange}
                  id="schedule"
                  name="deadline"
                  defaultValue="2021-06-21T00:00"
                  min="2021-06-21T00:00"
                  max="2031-06-21T00:00"
                ></input>
              </div>
              <div className="col-md-5 mb-3">
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    this.props.addTodo(this.state);
                  }}
                  className="btn btn-secondary w-100 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
export default AddBar;
