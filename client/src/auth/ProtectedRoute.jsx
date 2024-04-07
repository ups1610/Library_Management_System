import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/Authetication';

const ProtectedRoute = () => {
    const auth = useAuth();
    const token = auth.token 
    console.log(auth)
    if (!token) {
        return "Page not found";
    }
    return <Outlet />;
};

export default ProtectedRoute;