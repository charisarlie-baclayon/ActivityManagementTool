import { useState } from "react";
import "./App.css";
import ViewActivities from "./pages/Teacher/ViewActivities";
import { Route, Routes } from "react-router-dom";
import VerticalNavBar from "./assets/common/vertical-nav-bar";
import { Teacher } from "./pages/Teacher/Teacher";
import { NotFound } from "./assets/common/NotFound";
import { Student } from "./pages/Student/Student";
import { StudentViewActivities } from "./pages/Student/StudentViewActivities";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <VerticalNavBar isSidebarOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />
      <Routes>
        <Route path="teacher" element={<Teacher isSidebarOpen={isSidebarOpen}/>}>
          <Route path="activities" element={<ViewActivities />} />
        </Route>
        <Route path="student" element={<Student isSidebarOpen={isSidebarOpen}/>}>
          <Route path="activities" element={<StudentViewActivities/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
