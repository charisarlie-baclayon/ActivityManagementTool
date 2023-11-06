import { useEffect } from "react";
import {
	Route,
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";
//import { verifyToken } from "../../api/Authentication";
import { useSelector } from "react-redux";
import {
	selectCurrentToken,
	selecCurrentRole,
} from "../../features/auth/authSlice";
import { useVerifyTokenMutation } from "../../api/Authentication";

export const PrivateRoutes = () => {
	const role = useSelector(selecCurrentRole);
	const location = useLocation();
	const token = useSelector(selectCurrentToken);
	// const token =
	//     "1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTU2MTA5MywiaWF0IjoxNjk3Nzg1MDkzLCJqdGkiOiIyNjIzMzhiZjE1MzM0ZjhiOTQzZWEzYzFmZTdiZmY3MCIsInVzZXJfaWQiOjMsImVtYWlsIjoic3R1ZGVudEBlbWFpbC5jb20ifQ.c8JnHvNUdOC8bBn8fwjq6mQhWRoUH0fxYhBCCJ7kwY8";
	const navigate = useNavigate();
	const [verifyToken] = useVerifyTokenMutation();
	useEffect(() => {
		const verifyAccessToken = async () => {
			if (token) {
				try {
					const verificationResponse = await verifyToken(token);
					if (!verificationResponse) {
						console.log("di ka authorized");
						navigate("/");
					}
				} catch (error) {
					console.log("di ka authorized");
					console.error(error);
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

	if (role === "teacher" && location.pathname.startsWith("/teacher")) {
		return <Outlet />;
	}

	if (role === "student" && location.pathname.startsWith("/student")) {
		return <Outlet />;
	}

	return <Navigate to={`/${role}`} />;
};
