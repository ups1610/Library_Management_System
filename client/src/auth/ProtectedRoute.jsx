import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/Authetication';

const ProtectedRoute = () => {
    const {user,token,isAuthenticated, setAuthenticated} = useAuth();
    console.log(user,token,isAuthenticated, setAuthenticated,"auth token passed")
    // const token = auth.token 
    
    // if (!token) {
    //     return "Page not found";
    // }
    return <Outlet />;
};

export default ProtectedRoute;