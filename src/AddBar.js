import React, { Component } from "react";

class AddBar extends Component {
  initialState = {
    name: "",
    job: "",
  };

  state = this.initialState;
  render() {
    return (
      <form>
        <div className="row my-5 mx-2">
          <div className="mb-3 col-md-6">
            <input
              name="text"
              type="text"
              placeholder="Add Todo Text"
              className="form-control"
            ></input>
          </div>
          <div className="mb-3 col-md-6">
            <input
              name="title"
              type="text"
              placeholder="Add Todo Title"
              className="form-control"
            ></input>
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="radio"
              className="btn-check"
              name="priority"
              id="secondary-outlined"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-secondary rounded w-25"
              htmlFor="secondary-outlined"
            >
              none
            </label>

            <input
              type="radio"
              className="btn-check"
              name="priority"
              id="primary-outlined"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-primary rounded w-25"
              htmlFor="primary-outlined"
            >
              low
            </label>
            <input
              type="radio"
              className="btn-check"
              name="priority"
              id="warning-outlined"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-warning rounded w-25"
              htmlFor="warning-outlined"
            >
              mid
            </label>
            <input
              type="radio"
              className="btn-check"
              name="priority"
              id="danger-outlined"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-danger rounded w-25"
              htmlFor="danger-outlined"
            >
              high
            </label>
          </div>
          <div className="col-md-4 mb-3">
            <input
              className="h-100 w-100 rounded outline-none px-2"
              type="datetime-local"
              id="schedule"
              name="deadline"
              defaultValue="2021-06-21T00:00"
              min="2021-06-21T00:00"
              max="2031-06-21T00:00"
            ></input>
          </div>
          <div className="col-md-4 mb-3 d-grid gap-2">
            <button type="submit" className="btn btn-primary rounded">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default AddBar;
