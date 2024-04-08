import React, { Children } from 'react'; // Make sure to import `Children` from `react` module
import { Outlet } from "react-router-dom";
import { useAuth } from '../context/Authetication';

export const AdminProtectedRoute = ({ children }) => { // Corrected `childern` to `children`
    const { user } = useAuth();
    console.log("-----", user.role);
    if (user.role === "ROLE_ADMIN") {
        return <>{children}</>; // Corrected the rendering of children
    }
    return <></>;
}
