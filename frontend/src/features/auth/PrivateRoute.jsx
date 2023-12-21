import { useEffect } from "react";
import {
	Route,
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";
//import { verifyToken } from "../../Api/Authentication";
import { useSelector } from "react-redux";
import {
	selectCurrentToken,
	selectCurrentRole,
	logOut,
	selectCurrentRefresh,
	selectCurrentUser,
} from "../../features/auth/authSlice";
import { persistor } from "../../store";
import { useDispatch } from "react-redux";
import {
	useRefreshTokenMutation,
	useVerifyTokenMutation,
} from "../../Api/Authentication";
import { setCredentials } from "../../features/auth/authSlice";

export const PrivateRoutes = () => {
	const currentRole = useSelector(selectCurrentRole);
	const location = useLocation();
	const token = useSelector(selectCurrentToken);
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);

	const navigate = useNavigate();
	const [verifyToken] = useVerifyTokenMutation();
	const [refreshToken] = useRefreshTokenMutation();
	const refresh = useSelector(selectCurrentRefresh);

	useEffect(() => {
		const verifyAccessToken = async () => {
			if (token) {
				try {
					const verificationResponse = await verifyToken(token);

					if (verificationResponse?.error?.status === 401) {
						// refresh token

						const refreshResponse = await refreshToken(refresh).unwrap();

						dispatch(
							setCredentials({
								accessToken: refreshResponse.access,
								refreshToken: refreshResponse.refresh,
								role: currentRole,
								user: currentUser,
							})
						);

						window.location.reload();
					}
				} catch (error) {
					console.log("di ka authorized");
					console.error(error);
					dispatch(logOut());
					persistor.purge();
					navigate("/");
				}
			}
		};

		verifyAccessToken();
	}, [token, navigate]);

	if (!token) {
		console.log("no token");
		return <Navigate to='/' />;
	}

	if (currentRole === "teacher" && location.pathname.startsWith("/teacher")) {
		return <Outlet />;
	}

	if (currentRole === "student" && location.pathname.startsWith("/student")) {
		return <Outlet />;
	}

	return <Navigate to={`/${currentRole}`} />;
};
