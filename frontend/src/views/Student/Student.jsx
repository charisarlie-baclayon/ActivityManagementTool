import { Outlet} from "react-router-dom";
import { Student_SideBar } from "../../components/SideBar/Student";
import { Student_NavBar } from "../../components/NavBar/Student";

export const Student = () => {
  return (
    <div >
      <Student_SideBar/>
      <div className="view-sidebar"> {/* Added a custom class for styling */}
        <Student_NavBar/>
        <Outlet/>
      </div>
    </div>
  );
};
