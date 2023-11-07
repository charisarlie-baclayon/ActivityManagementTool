
export const TemplateCard = ({ templateData, onClick }) => {
	return (
		<div className={`p-3 shadow border border-primary rounded-3 d-flex align-items-center`} onClick={onClick}>
			<div className="d-flex flex-row gap-3 align-items-center">
				<div className=" bg-dark p-3 rounded-3 " />
				<h6 className="fw-bold  m-0">{templateData.title}</h6>
			</div>
		</div>
	);
};