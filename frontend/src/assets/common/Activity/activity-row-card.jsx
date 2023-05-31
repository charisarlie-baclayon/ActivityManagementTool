import React from "react";
import "./activity-row-card.css";

export const ActivityRowCard = ({ onClick, ...props }) => {
  return (
    <button className="activity-row-card" onClick={onClick}>
      <div className="activity-row-details">
        <div className="img">
          <i className="bx bx-notepad"></i>
        </div>
        <div className="text">
          <h2>{props.name}</h2>
        </div>
      </div>
      <div className="activity-row-link">
        <h5>{props.status}</h5>
      </div>
    </button>
  );
};
