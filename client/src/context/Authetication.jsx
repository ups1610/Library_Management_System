import React, { createContext, useContext, useState,} from 'react';
import { login, logout } from '../action/AuthAction';
import toast from "react-hot-toast";

const AuthenticationContext = createContext(null);

export const useAuth = () => {
    const auth = useContext(AuthenticationContext);
    return auth;
};

const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState(() => {
      // Initialize token from local storage if available
      return localStorage.getItem('token') || null;
  });

    const signUp = async (userName, password) => {
        const response = await login(userName, password);
        if (response.success === true) {
            const authToken = response.data;
            localStorage.setItem('token', authToken);
            setToken(response.data.token);
            const userData = { ...response.data };
            delete userData.token;
            setUser(userData);
            toast.success("Login Success. Redirecting...");
            setTimeout(()=>{
              window.location.href = "/dashboard";
            },2000)
        } else {
            toast.error(response.data.error);
        }
    };

    const signOut= async()=>{
      const response= await logout();

      if(response.success===true){
          localStorage.removeItem('token')
          setUser(null)
          setToken(null)
          window.location.href="/"
      }
    
      
    }


    return (
        <AuthenticationContext.Provider value={{ signUp, token, user, signOut }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
