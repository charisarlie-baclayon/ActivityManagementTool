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
import { Student_CreateActivity } from './components/popups/activity/student-create-activity';
import { Teacher_TemplateSection } from "./views/Teacher/Template";
import { Teacher_SelectedTemplateSection } from "./views/Teacher/Template-Selected";
import { Teacher_CreateActivitySection } from "./views/Teacher/Activity-Create";

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='home' element={<Home />} />
			<Route path='teacher/signin' element={<Teacher_SignIn />} />
			<Route path='student/signin' element={<Student_SignIn />} />

			<Route element={<PrivateRoutes />}>
				<Route path='teacher' element={<Teacher />}>
					<Route index element={<Teacher_HomeSection />} />
					<Route path='home' element={<Teacher_HomeSection />} />
					<Route path='activities' element={<Teacher_ActivitySection />} />
					<Route path='classes' element={<Teacher_ClassSection />} />
					<Route
						path='classes/:id'
						element={<Teacher_SelectedClassSection />}
					/>
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
					<Route
						path='activities/new'
						element={<Student_CreateActivity />}
					/>
					<Route path='teams' element={<Student_TeamSection />} />
				</Route>
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default App;
