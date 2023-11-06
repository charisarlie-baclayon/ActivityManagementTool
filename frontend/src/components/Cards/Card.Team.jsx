export const TeamCard = ({ teamData, onClick }) => {
	return (
		<div className='card p-3 shadow clickable' onClick={onClick}>
			<div className='card-body d-flex flex-column align-items-center gap-3 '>
				<div className=' bg-secondary p-5 rounded-3 ' />
				<h5 className='card-title'>{teamData.name}</h5>
				<h6 className='card-text'>{teamData.course_name}</h6>
			</div>
		</div>
	);
};
