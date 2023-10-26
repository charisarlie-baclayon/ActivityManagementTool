import { useEffect } from 'react';
import { Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { verifyToken } from "../api/Authentication";

export const PrivateRoutes = () => {
    const [access, setAccess] = useLocalStorage('access', '');
    const [role] = useLocalStorage('role', '');
    const location = useLocation();
    
    useEffect(() => {
        const verifyAccessToken = async () => {
            if (access) {
                try {
                    const verificationResponse = await verifyToken(access);
                    console.log(verificationResponse);
                    if (!verificationResponse) {
                        setAccess('');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        verifyAccessToken();
    }, [access, setAccess]);

    if (!access) {
        return <Navigate to="/"/>;
    }

    if (role === 'teacher' && location.pathname.startsWith('/teacher')) {
        return <Outlet />;
    }

    if (role === 'student' && location.pathname.startsWith('/student')) {
        return <Outlet />;
    }

    return <Navigate to={`/${role}`} />;
};
