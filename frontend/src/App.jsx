import { useState } from "react";
import "./App.css";
import ViewActivities from "./pages/Teacher/ViewActivities";
import { Route, Routes } from "react-router-dom";
import { Teacher } from "./pages/Teacher/Teacher";
import { NotFound } from "./assets/common/NotFound";
import { Student } from "./pages/Student/Student";
import { StudentViewActivities } from "./pages/Student/StudentViewActivities";
import { Home } from "./pages/Home/Home";

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
        </Route>

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
