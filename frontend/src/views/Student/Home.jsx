import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
  logOut,
} from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../store";

export const Student_HomeSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  //const token = useSelector(selectCurrentToken);
  const currentUser = user ? user : "no name!";

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
    <div className='container'>
      <div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
        <h4 className='fw-bold'>Good Afternoon, {currentUser}!</h4>
        <hr className='text-dark' />

        <button className='btn btn-primary' onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </div>
  );
};
