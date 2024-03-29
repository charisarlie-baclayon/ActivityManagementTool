import "@assets/css/sign-in.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import {
	useLoginTeacherMutation,
	useAcquireTokenMutation,
} from "../../Api/Authentication";

export const Teacher_SignIn = () => {
	const userRef = useRef();
	const errRef = useRef();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	//const [acquireToken, { isAcquiring }] = useAcquireTokenMutation();
	const [login] = useLoginTeacherMutation();
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

			if (loginUser) {
				if (loginUser.role !== "teacher") {
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
						role: "teacher",
						refreshToken: response.refresh,
					})
				);
				setEmail("");
				setPassword("");
				navigate("/teacher/home", { replace: true });
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
			navigate("/teacher/sign-in");
		}
	};

	return (
		<div className='bg-dark'>
			<div className='container-md d-flex justify-content-center align-items-center vh-100 '>
				<div className='card w-100 h-75 d-flex flex-row'>
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

							<button type='submit' className='btn btn-primary btn-block'>
								Submit
							</button>
							<button className='btn btn-secondary btn-block' onClick={() => navigate('/teacher/signup')}>
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
