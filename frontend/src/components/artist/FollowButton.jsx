import React from "react";
import "./FollowButton.scss";

const FollowButton = ({ onClick, children = "Follow" }) => (
  <button className="follow-button" onClick={onClick}>
    {children}
  </button>
);

export default FollowButton;
