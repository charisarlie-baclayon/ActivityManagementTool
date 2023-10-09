import React from "react";
import './activity-row-card.css';

export const ActivityRowCard = ({ onClick, ...props }) => {

  // Determine the text color class based on the status
  let statusColorClass = "";
  if (props.status === "COMPLETE") {
    statusColorClass = "text-success ";
  } else if (props.status === "IN-PROGRESS") {
    statusColorClass = "text-warning";
  } else if (props.status === "INCOMPLETE") {
    statusColorClass = "text-danger";
  }

  return (
    <button className={`btn btn-outline-dark p-3 rounded-3 d-flex align-items-center justify-content-between`} onClick={onClick}>
      <h6 className="fw-bold  m-0">{props.name}</h6>
      <div className=" bg-dark p-3 rounded-3 ">
      <p className={`small m-0 fw-bold ${statusColorClass}`}>{props.status}</p>
      </div>
    </button>
  );
};