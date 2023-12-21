import "@assets/css/sign-in.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { Authentication } from "../../Api/Authentication";
import {
	useLoginStudentMutation,
	useAcquireTokenMutation,
} from "../../Api/Authentication";
import { setStudentModel } from "../../features/slice/studentModelSlice";
import { saveToLocalStorage } from "../../components/utils/utils";

export const Student_SignIn = () => {
	const userRef = useRef();
	const errRef = useRef();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const [login] = useLoginStudentMutation();
	const [acquireToken] = useAcquireTokenMutation();

	const dispatch = useDispatch();

	useEffect(() => {
		if (userRef.current) {
			userRef.current.focus();
		}
	}, []);

	useEffect(() => {
		setErrorMessage("");
	}, [email, password]);

	const handleCancel = () => {
		navigate("/");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const loginUser = await login({ email, password }).unwrap();
			console.log(loginUser);

			if (loginUser) {
				if (loginUser.role !== "student") {
					window.alert("Unauthorized: You are not authorized to access this resource.");
					return;
				}

				const response = await acquireToken({
					email,
					password,
				}).unwrap();

				dispatch(
					setCredentials({
						id: loginUser.id,
						user: `${loginUser.first_name} ${loginUser.last_name}`,
						accessToken: response.access,
						role: "student",
					}),
				);
				dispatch(
					setStudentModel({
						id: loginUser.id,
						first_name: loginUser.first_name,
						last_name: loginUser.last_name,
						email: loginUser.email,
						role: loginUser.role,
						user: `${loginUser.first_name} ${loginUser.last_name}`,
						student_team: loginUser.student_team,
					}),
				);

				saveToLocalStorage('studentModel', {
					id: loginUser.id,
					first_name: loginUser.first_name,
					last_name: loginUser.last_name,
					email: loginUser.email,
					role: loginUser.role,
					user: `${loginUser.first_name} ${loginUser.last_name}`,
					student_team: loginUser.student_team,
				});

				setEmail("");
				setPassword("");
				navigate("/student/home", { replace: true });
			}
		} catch (error) {
			if (!error?.originalStatus) {
				// isLoading: true until timeout occurs
				setErrorMessage("No Server Response");
			} else if (error.originalStatus === 400) {
				setErrorMessage("Missing Username or Password");
			} else if (error.originalStatus === 401) {
				setErrorMessage("Unauthorized");
			} else {
				setErrorMessage("Login Failed");
			}

			// Display Windows alert for incorrect credentials
			window.alert("Incorrect credentials. Please try again.");

			console.error(error);
			errRef.current.focus();
			navigate("/student/sign-in");
		}
	};

	return (
		<div className='bg-dark'>
			<div className='container-md d-flex justify-content-center align-items-center vh-100 '>
				<div className='card h-75 w-100 d-flex flex-row'>
					<div className='p-0  col-md-6 '>
						<div className='sign-in-img sign-in-right'>
							<div className='sign-in-img-overlay'></div>
						</div>
					</div>

					<div className='card-body m-3 col-md-6 d-flex flex-column gap-3'>
						<div>
							<h4 className='m-0 fw-bold'>Sign In</h4>
							<hr />
						</div>
						<form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
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

							<div className='mb-3 form-check'>
								<input
									type='checkbox'
									className='form-check-input'
									id='rememberMe'
									name='rememberMe'
								/>
								<label className='form-check-label' htmlFor='rememberMe'>
									Remember Me
								</label>
							</div>

							<button type='submit' className='btn btn-primary  btn-block'>
								Submit
							</button>
							<button className='btn btn-secondary btn-block' onClick={() => navigate('/student/signup')}>
								Don't have an Account
							</button>
							<button
								className='btn btn-outline-secondary bw-3 btn-block'
								onClick={handleCancel}
							>
								Cancel
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
