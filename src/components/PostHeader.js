import React, { Component } from "react";

class PostHeader extends Component {
  render() {
    return (

      <div className="post">
        <div className="cycle">
          <i className="fas fa-arrow-left fa-2x"></i>
        </div>
        <div className="postInfo">
          <h1>TestUser - "C Major Scale"</h1>
        </div>
        <div className="cycle">
          <i className="fas fa-arrow-right fa-2x"></i>
        </div>
      </div>

    );
  }
}

export default PostHeader;