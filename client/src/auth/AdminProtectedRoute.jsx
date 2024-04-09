import React, { Children } from 'react'; 
import { Outlet } from "react-router-dom";
import { useAuth } from '../context/Authetication';

export const AdminProtectedRoute = ({ children }) => { 
    const { user } = useAuth();
    console.log("-----", user.role);
    if (user.role === "ROLE_ADMIN") {
        return <>{children}</>; 
    }
    return <></>;
}
