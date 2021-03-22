import React, { Component } from "react";
import UserAvatar from "./UserAvatar";

export default class PostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="post-item">
        <UserAvatar title={this.props.title} meta={this.props.meta} />
        {this.props.hasLine ? <hr /> : null}
        <p>{this.props.content}</p>
      </div>
    );
  }
}
