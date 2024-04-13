import React from 'react';

import { useAuth } from '../context/Authetication';

export const AccountantProtectedRoute = ({children}) => {
    const {user} = useAuth();
    if (user.role==="ROLE_ADMIN" || user.role==="ROLE_ACCOUNTANT") {
        return <>{children}</>
    }
    return ;
}
