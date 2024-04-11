import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/Authetication';

export const CatalogerProtectedRoute = ({children}) => {
    const {user} = useAuth();
    if (user.role!=="ROLE_ADMIN" || user.role!=="ROLE_CATALOGER") {
        return <>{children}</>
    }
    return <Outlet />;
}
