import { Outlet } from "react-router-dom";
import { Teacher_NavBar } from "../../components/NavBar/Teacher";
import { Teacher_SideBar } from "../../components/SideBar/Teacher";

export const Teacher = () => {
	return (
		<div className="d-flex flex-row view-sidebar bg-light">
			<Teacher_SideBar />
			<div className="w-100 min-vh-100 pb-5">
				<Teacher_NavBar />
				<Outlet />
			</div>
		</div>
	);
};