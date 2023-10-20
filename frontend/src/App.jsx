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
import { Student_ActivitySection } from "./views/Student/Activity";

function App() {
  return (
      <Routes>
        {/*Path to home */}
        <Route path="/" element={<Home/>}>
          <Route path="home" element={<Home/>} />
        </Route>d

        {/*Path to home */}
        <Route path="teacher" element={<Teacher/>}>
          <Route index element={<Teacher_HomeSection />} />
          <Route path="home" element={<Teacher_HomeSection/>} />
          <Route path="activities" element={<Teacher_ActivitySection/>} />
          <Route path="classes" element={<Teacher_ClassSection/>}/>
          <Route path="classes/:id" element={<Teacher_SelectedClassSection />} />
          <Route path="teams"/>
        </Route>
        
        {/*Path to home */}
        <Route path="student" element={<Student/>}>
          <Route index element={<Student_HomeSection />} />
          <Route path="home" element={<Student_HomeSection/>} />
          <Route path="activities" element={<Student_ActivitySection/>} />
          <Route path="classes"/>
          <Route path="teams"/>
        </Route>
        
        {/*Path to home */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
