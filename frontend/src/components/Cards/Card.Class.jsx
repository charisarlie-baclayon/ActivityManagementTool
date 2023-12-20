export const ClassCard = ({ classData, onClick }) => {
    return (
        <div className="card border border-primary p-3 shadow clickable" onClick={onClick}>
            <div className="card-body d-flex flex-column align-items-center gap-3 ">
                <div className=" bg-dark p-5 rounded-3 " />
                <h5 className="card-title">{classData.name}</h5>
                <h6 className="card-text">{classData.course_name}</h6>
            </div>
        </div>
    );
};
