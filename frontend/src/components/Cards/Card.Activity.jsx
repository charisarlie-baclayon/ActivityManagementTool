
export const ActivityCard = ({ onClick, ...props }) => {
  console.log(props.title);
  return (
    <button className={`btn btn-outline-dark p-3 rounded-3 d-flex align-items-center justify-content-between`} onClick={onClick}>
      <h6 className="fw-bold  m-0">{props.title}</h6>
      <div className=" bg-dark p-3 rounded-3 ">
      </div>
    </button>
  );
};