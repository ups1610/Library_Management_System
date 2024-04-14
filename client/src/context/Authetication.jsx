import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();
const url = "http://localhost:8088";

export const useAuth = () => {
  const auth = useContext(AuthenticationContext);
  return auth;
};

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const signUp = async (userName, password) => {
    axios
      .post(
        url + "/auth/login",
        {
          userName,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
      
          setAuthenticated(true);
          setToken(resp.data.token);
          setUser(resp.data);
          toast.success("Login Success. Redirecting...");
          if (resp.data.token) {
          setTimeout(()=>{
            navigate("/dashboard");
          },1000)  
            
          }
        
      })
      .catch((error) => {
       
        if (error.response ) {

           toast.error(error.response.data.error);
        } else {
          toast.error("Something Went Wrong. Try later!");
          console.error("Something went wrong: ", error);
         
        }
      });
  };

  const signOut = async () => {
    axios
      .get(url + "/auth/logout", {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
     
          setUser({});
          setToken(false);
          setAuthenticated(false);
          toast.success("Logout Successfully!")
          navigate("/");
       
      })
      .catch((err) => {
        console.error("Something went wrong: ", err);
          toast.error("Failed to logout. Try later on");
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        signUp,
        token,
        setToken,
        setUser,
        user,
        signOut,
        isAuthenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
