import React from 'react';
import "./activity-row-card.css";

export const ActivityRowCard = (props) => {
  return (
    <>
      <div className="activity-row-card">
        <div className="activity-row-details">
          <div className="img">
            <i className="bx bx-notepad"></i>
          </div>
          <div className="text">
            <h2>{props.name}</h2>
            <span>{props.description}</span>
          </div>
        </div>
        <div className="activity-row-link">
          <h5>{props.link}</h5>
        </div>
      </div>
    </>
  );
};