import "@assets/css/sign-in.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { acquireToken, loginTeacher } from "../../api/Authentication";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Teacher_SignIn = () => {
  const [refresh, setRefresh] = useLocalStorage('refresh', '');
  const [access, setAccess] = useLocalStorage('access', '');
  const [role, setRole] = useLocalStorage('role', '');

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await loginTeacher(
        email, 
        password
      );
      const tokens = await acquireToken(
        email,
        password
      );
  
      if (response) {
        console.log(response);
        setRole(response.role);
        setRefresh(tokens.refresh);
        setAccess(tokens.access);
        navigate('/teacher/home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark">
      <div className='container-md d-flex justify-content-center align-items-center vh-100 '>
        <div className="card w-100 h-75 d-flex flex-row">
          <div className="card-body m-3 col-md-6 d-flex flex-column gap-3">
            <div>
              <h4 className="m-0 fw-bold">Sign In</h4>
              <hr/>
            </div>
            <form 
              className="d-flex flex-column gap-3"
              onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  name="email" 
                  onChange={e => setEmail(e.target.value)}/>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  name="password" 
                  onChange={e => setPassword(e.target.value)}/>
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Submit</button>
              <button className="btn btn-outline-secondary bw-3 btn-block" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
          
          <div className='p-0  col-md-6 '>
            <div className='sign-in-img sign-in-left'>
              <div className='sign-in-img-overlay'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
