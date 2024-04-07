import React, { createContext, useContext, useState } from 'react'
import { login, logout } from '../action/AuthAction';
import toast from "react-hot-toast";
import {Navigate} from "react-router-dom"



const AuthenticationContext= createContext(null);

export const useAuth = () => {
    const auth = useContext(AuthenticationContext);
    return auth;
  };


const AutheticationProvider = ({children}) => {
    let [user,setUser]=useState("");
    let [token,setToken]=useState(null)

    const signUp= async(userName,password)=>{
        const response= await login(userName,password);
        console.log(response)
       if(response.success===true){
       
      
        await  setToken(response.data.token);

        const userData = { ...response.data }; 
        delete userData.token;
       await setUser(userData);
        console.log("---")
     
      
        toast.success("Login Success. Redirectiong...")

        setTimeout(()=>{
          console.log(user);
          console.log(token);
          window.location.href="/dashboard"
        },1300)
       
       }else{
            toast.error(response.data.error)
       }
    }
    const signOut= async()=>{
        const response= await logout();

        if(response.success===true){
            setUser(null)
            setToken(null)
         
            window.location.href="/"
            // <Navigate to="/" replace={true}/>
        }
      
        
      }
    

  return (
    <AuthenticationContext.Provider value={{ token, user, setUser, setToken,signUp,signOut }}>
    {children}
  </AuthenticationContext.Provider>
  
  )
}

export default AutheticationProvider;
