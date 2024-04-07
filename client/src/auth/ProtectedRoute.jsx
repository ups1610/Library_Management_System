import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from '../context/Authetication'

 const ProtectedRoute = () => {

    const auth=useAuth();
    if( !auth.token || auth.token===undefined) return <> Page Not Found</>
    return <Outlet/>
}
export default ProtectedRoute;
