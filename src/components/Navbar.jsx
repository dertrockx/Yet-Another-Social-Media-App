import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <nav className="navbar">
        <div className="left">
          <span className="logo-text">
            Social
            <span className="light">app</span>
          </span>
        </div>
        <div className="right">
          <p className="item">Feed</p>
          <p className="item">Profile</p>
          <p className="item">Help</p>
        </div>
      </nav>
    );
  }
}
