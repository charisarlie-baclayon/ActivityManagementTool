import "@assets/css/sign-in.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import {
	useSignUpTeacherMutation,
	useAcquireTokenMutation,
	useLoginTeacherMutation,
} from "../../Api/Authentication";


export const Teacher_SignUp = () => {
	const userRef = useRef();
	const errRef = useRef();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
  
	const [signUp] = useSignUpTeacherMutation();
	const [acquireToken] = useAcquireTokenMutation();
  
	const dispatch = useDispatch();
  
	useEffect(() => {
	  if (userRef.current) {
		userRef.current.focus();
	  }
	}, []);
  
	useEffect(() => {
	  setErrorMessage('');
	}, [firstName, lastName, email, password]);
  
	const handleCancel = () => {
	  navigate('/');
	};
  
	const handleSubmit = async (e) => {
		e.preventDefault();
	  
		// Validate that none of the fields are empty
		if (!firstName || !lastName || !email || !password) {
			setErrorMessage('Please fill in all the fields.');
			window.alert('All fields should be filled.');
			return;
		}

		try {
		  const newUser = await signUp({
			first_name: firstName,
			last_name: lastName,
			email,
			password,
			role: 'teacher',
		  }).unwrap();
	  
		  const response = await acquireToken({
			email,
			password,
		  }).unwrap();
	  
		  dispatch(
			setCredentials({
			  id: newUser.id,
			  user: `${newUser.first_name} ${newUser.last_name}`,
			  accessToken: response.access,
			  role: 'teacher',
			  refreshToken: response.refresh,
			})
		  );
	  
		  setFirstName('');
		  setLastName('');
		  setEmail('');
		  setPassword('');
	  
		  window.alert('Registration Success. Sign in now.');
		  // Redirect to sign-in page after successful sign-up
		  navigate('/teacher/signin');
		} catch (error) {
		  // Handle errors and display messages
		  console.error(error);
		  setErrorMessage('Registration Failed');
		  window.alert('Registration failed. Please try again.');
		  errRef.current.focus();
		}
	  };
  
	return (
	  <div className='bg-dark'>
		<div className='container-md d-flex justify-content-center align-items-center vh-100 '>
		  <div className='card w-100 d-flex flex-row'>
			<div className='card-body m-3 col-md-6 d-flex flex-column gap-3'>
			  <div>
				<h4 className='m-0 fw-bold'>Sign Up</h4>
				<hr />
			  </div>
			  <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
				<div className='mb-3'>
				  <label htmlFor='firstName' className='form-label'>
					First Name
				  </label>
				  <input
					type='text'
					className='form-control'
					id='firstName'
					name='firstName'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				  />
				</div>
  
				<div className='mb-3'>
				  <label htmlFor='lastName' className='form-label'>
					Last Name
				  </label>
				  <input
					type='text'
					className='form-control'
					id='lastName'
					name='lastName'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				  />
				</div>
  
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						type='email'
						className='form-control'
						id='email'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						className='form-control'
						id='password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
  
				<button type='submit' className='btn btn-primary btn-block'>
				  Submit
				</button>
				<button className='btn btn-secondary btn-block' onClick={() => navigate('/teacher/signin')}>
				  Already have an Account
				</button>
				<button
				  className='btn btn-outline-secondary bw-3 btn-block'
				  onClick={handleCancel}
				>
				  Cancel
				</button>
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