import React from 'react';
import {Outlet } from "react-router-dom";
import { useAuth } from '../context/Authetication';

export const LibrarianProtectedRoute = ({children}) => {
    const {user} = useAuth();
    if ( user.role==="ROLE_LIBRARIAN") {
        return <>{children}</>
    }
    return ;
}
