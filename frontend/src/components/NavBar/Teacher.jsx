import React, { useState } from 'react';
import {
	FiBell,
	FiUser,
	FiLogOut,
} from 'react-icons/fi';
import {
	selectCurrentUser,
	selectCurrentToken,
	logOut,
} from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../store";

export const Teacher_NavBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

	const handleNavbarToggle = () => {
		setIsNavbarCollapsed(!isNavbarCollapsed);
	};


	const handleLogout = async (e) => {
		e.preventDefault();

		try {
			dispatch(logOut);
			persistor.purge();
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="navbar navbar-expand-md bg-light shadow pl-3 pr-3">
			<div className="container-md">
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarContent"
					aria-controls="navbarContent"
					aria-expanded={!isNavbarCollapsed}
					onClick={handleNavbarToggle}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className={`collapse gap-5 navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarContent">
					<div className="navbar-nav ml-auto gap-3">
						<span className="nav-item nav-link">
							{isNavbarCollapsed ? <FiBell /> : 'Notification'}
						</span>
						<span className="nav-item nav-link">
							{isNavbarCollapsed ? <FiUser /> : 'User'}
						</span>
						<span className="nav-item nav-link" onClick={handleLogout}>
							{isNavbarCollapsed ? <FiLogOut /> : 'Logout'}
						</span>
					</div>
				</div>
			</div>
		</nav>
	);
};
