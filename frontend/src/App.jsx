import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Teacher } from "@views/Teacher/Teacher";
import { NotFound } from "@assets/common/NotFound";
import { Student } from "@views/Student/Student";
import { StudentViewActivities } from "@views/Student/StudentViewActivities";
import { Home } from "@views/Home/Home";
import "./App.css";
import { Student_HomeSection } from "./views/Student/Student.Home";
import { Teacher_HomeSection } from "./views/Teacher/Teacher.Home";
import { Teacher_ActivitySection } from "./views/Teacher/Teacher.Activity";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Routes>
        {/*Path to home */}
        <Route path="/" element={<Home/>}>
          <Route path="home" element={<Home/>} />
        </Route>d

        {/*Path to home */}
        <Route path="teacher" element={<Teacher isSidebarOpen={isSidebarOpen}/>}>
          <Route path="home" element={<Teacher_HomeSection/>} />
          <Route path="activities" element={<Teacher_ActivitySection/>} />
        </Route>
        
        {/*Path to home */}
        <Route path="student" element={<Student isSidebarOpen={isSidebarOpen}/>}>
          <Route path="home" element={<Student_HomeSection/>} />
          <Route path="activities" element={<StudentViewActivities/>} />
        </Route>
        
        {/*Path to home */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
