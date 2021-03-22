import React, { Component } from "react";

export default class ChirpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="chirp-form">
        <label>
          <img
            src="https://picsum.photos/id/237/50/50"
            alt=""
            className="avatar"
          />
          <input type="text" placeholder="What's Happening" />
        </label>
        <button type="submit" className="btn" disabled>
          Chirp
        </button>
      </form>
    );
  }
}
