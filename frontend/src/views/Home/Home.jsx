import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	selectCurrentUser,
	selectCurrentRole,
} from "../../features/auth/authSlice";
import { Footer } from "@components/Footers/Home";
import { NavBar } from "@components/NavBar/Home";
import { Home_AboutSection } from "@views/Home/About";
import { Home_CTASection } from "@views/Home/CTA";
import { Home_ContactSection } from "@views/Home/Contact";
import { Home_HeroSection } from "@views/Home/Hero";
import { Home_TeamSection } from "@views/Home/Team";

export const Home = () => {
	const user = useSelector(selectCurrentUser);
	const role = useSelector(selectCurrentRole);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			if (role === "student") {
				navigate("/student");
			} else if (role === "teacher") {
				navigate("/teacher");
			}
		}
	}, [user]);

	return (
		<>
			<NavBar />
			<Home_HeroSection />
			<Home_AboutSection />
			<Home_TeamSection />
			<Home_ContactSection />
			<Home_CTASection />
			<Footer />
		</>
	);
};
