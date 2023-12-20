export const StudentCard = ({ studentData, onClick }) => {
	console.log("Received studentData:", studentData);
	return (
		<div className="card border border-primary p-3 shadow-sm clickable" >
			<div className="card-body d-flex flex-column align-items-center gap-3">
				<div className="bg-dark p-5 rounded-3"></div>
				<h5 className="card-title">{`${studentData.user.first_name} ${studentData.user.last_name}`}</h5>
				<h6 className="card-text">Email: {studentData.user.email}</h6>
			</div>
		</div>
	);
};
