import React, { Component } from "react";
import "./Post.css";

class Comment extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const comments = this.props.comments;
        const comm = comments.map((comment) =>
          <li>{comment}</li>
        );
      return (
          <div className="Post-caption">
            <ul>{comm}</ul>
          </div>
      );
      }
}

export default Comment;