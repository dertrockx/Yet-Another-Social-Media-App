import React, { Component } from "react";

export default class UserAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={`user-avatar ${this.props.className}`}>
        <img
          src="https://picsum.photos/id/237/50/50"
          alt=""
          className="avatar"
        />
        <div className="info">
          <h3>{this.props.title}</h3>
          <div className="caption">{this.props.meta}</div>
        </div>
      </div>
    );
  }
}
