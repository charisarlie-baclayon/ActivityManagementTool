import { useState } from "react";
import ViewActivities from "@views/Teacher/ViewActivities";
import { Route, Routes } from "react-router-dom";
import { Teacher } from "@views/Teacher/Teacher";
import { NotFound } from "@assets/common/NotFound";
import { Student } from "@views/Student/Student";
import { StudentViewActivities } from "@views/Student/StudentViewActivities";
import { Home } from "@views/Home/Home";
import "./App.css";

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
          <Route path="activities" element={<ViewActivities />} />
        </Route>
        
        {/*Path to home */}
        <Route path="student" element={<Student isSidebarOpen={isSidebarOpen}/>}>
          <Route path="activities" element={<StudentViewActivities/>} />
        </Route>
        
        {/*Path to home */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
