import { Outlet } from "react-router-dom";
import { Student_SideBar } from "../../components/SideBar/Student";
import { Student_NavBar } from "../../components/NavBar/Student";

export const Student = () => {
	return (
		<div className="d-flex flex-row view-sidebar">
			<Student_SideBar />
			<div className="w-100 vh-100 "> {/* Added a custom class for styling */}
				<Student_NavBar />
				<Outlet />
			</div>
		</div>
	);
};
