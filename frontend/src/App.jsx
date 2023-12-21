import { Route, Routes } from "react-router-dom";
import { Teacher } from "@views/Teacher/Teacher";
import { NotFound } from "@assets/common/NotFound";
import { Student } from "@views/Student/Student";
import { Home } from "@views/Home/Home";
import "./App.css";
import { Student_HomeSection } from "./views/Student/Home";
import { Teacher_HomeSection } from "./views/Teacher/Home";
import { Teacher_ActivitySection } from "./views/Teacher/Activity";
import { Teacher_ClassSection } from "./views/Teacher/Class";
import { Teacher_SelectedClassSection } from "./views/Teacher/Class-Selected";
import { Teacher_SelectedTeamSection } from "./views/Teacher/Team-Selected";
import { Student_ActivitySection } from "./views/Student/Activity";
import { PrivateRoutes } from "./features/auth/PrivateRoute";
import { Teacher_TeamSection } from "./views/Teacher/Team";
import { Student_TeamSection } from "./views/Student/Team";
import { Student_SignIn } from "./views/Student/SignIn";
import { Teacher_SignIn } from "./views/Teacher/SignIn";
import { Teacher_TemplateSection } from "./views/Teacher/Template";
import { Teacher_SelectedTemplateSection } from "./views/Teacher/Template-Selected";
import { Teacher_CreateActivitySection } from "./views/Teacher/Activity-Create";
import { Student_SelectedTeamSection } from "./views/Student/Team-Selected";
import { Student_CreateActivitySection } from "./views/Student/Activity-Create";
import { Student_TemplateSection } from "./views/Student/Template";
import { Student_SelectedTemplateSection } from "./views/Student/Template-Selected";
import { Teacher_SelectedActivitySection } from "./views/Teacher/Activity-Selected";
import { Student_SelectedActivitySection } from "./views/Student/Activity-Selected";
import { Teacher_SignUp } from "./views/Teacher/SignUp";
import { Student_SignUp } from "./views/Student/SignUp";

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='home' element={<Home />} />
			<Route path='teacher/signin' element={<Teacher_SignIn />} />
			<Route path='student/signin' element={<Student_SignIn />} />
			<Route path='teacher/signup' element={<Teacher_SignUp />} />
			<Route path='student/signup' element={<Student_SignUp />} />

			<Route element={<PrivateRoutes />}>
				<Route path='teacher' element={<Teacher />}>
					<Route index element={<Teacher_HomeSection />} />
					<Route path='home' element={<Teacher_HomeSection />} />
					<Route path='activities' element={<Teacher_ActivitySection />} />
					<Route path='activities/:id' element={<Teacher_SelectedActivitySection />} />
					<Route path='classes' element={<Teacher_ClassSection />} />
					<Route path='classes/:id' element={<Teacher_SelectedClassSection />} />
					<Route path='teams' element={<Teacher_TeamSection />} />
					<Route path='teams/:id' element={<Teacher_SelectedTeamSection />} />
					<Route path='activities/new' element={<Teacher_CreateActivitySection />} />
					<Route path='activities/templates/' element={<Teacher_TemplateSection />} />
					<Route path='activities/templates/:id' element={<Teacher_SelectedTemplateSection />} />
				</Route>
			</Route>


			<Route element={<PrivateRoutes />}>
				<Route path='student' element={<Student />}>
					<Route index element={<Student_HomeSection />} />
					<Route path='home' element={<Student_HomeSection />} />
					<Route path='activities' element={<Student_ActivitySection />} />
					<Route path='activities/:id' element={<Student_SelectedActivitySection />} />
					<Route path='activities/new' element={<Student_CreateActivitySection />} />
					<Route path='teams' element={<Student_TeamSection />} />
					<Route path='teams/:id' element={<Student_SelectedTeamSection />} />
					<Route path='activities/templates/' element={<Student_TemplateSection />} />
					<Route path='activities/templates/:id' element={<Student_SelectedTemplateSection />} />
				</Route>
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default App;
