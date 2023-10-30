import { useSelector } from "react-redux";
import {
    selectCurrentUser,
    selectCurrentToken,
} from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

export const Teacher_HomeSection = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const currentUser = user ? user : "no name!";
    const tokenAbbr = `${token.slice(0, 20)}...`;

    return (
        <div className='container'>
            <div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
                <h4 className='fw-bold'>Good Afternoon, {currentUser}!</h4>
                <h4 className='fw-bold'>token, {tokenAbbr}!</h4>
                <hr className='text-dark' />
            </div>
        </div>
    );
};
