import React from "react";
import emptyBox from "./empty-box.png";
import "./EmptyContainer.css";
function EmptyContainer({ title }) {
  return (
    <div className="img-container">
      <div className="img">
        <img src={emptyBox} alt="emptyBox" />
      </div>
      <h4>{title}</h4>
    </div>
  );
}

export default EmptyContainer;
