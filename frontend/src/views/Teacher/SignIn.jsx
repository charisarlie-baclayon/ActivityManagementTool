import "@assets/css/sign-in.css";
import { useNavigate } from "react-router-dom";

export const Teacher_SignIn = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  }

  return (
    <div className="bg-dark">
      <div className='container-md d-flex justify-content-center align-items-center vh-100 '>
        <div className="card w-100 h-75 d-flex flex-row">
          <div className="card-body m-3 col-md-6 d-flex flex-column gap-3">
            <div>
              <h4 className="m-0 fw-bold">Sign In</h4>
              <hr/>
            </div>
            <form className="d-flex flex-column gap-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" />
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
