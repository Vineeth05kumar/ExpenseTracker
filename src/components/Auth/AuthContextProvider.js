
import AuthContext from "./auth-context";
import React, { useState, useEffect } from "react";

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
      }
    }, []);
  
    const loginUser = (token) => {
      localStorage.setItem("token", token);
      setLoggedIn(true);
    };
  
    const logoutUser = () => {
      localStorage.removeItem("token");
      setLoggedIn(false);
    };
  
    const authContext = {
      isLoggedIn: loggedIn,
      logout: logoutUser,
      login: loginUser,
    };
  
    return (
      <AuthContext.Provider value={authContext}>
        {props.children}
      </AuthContext.Provider>
    );
  };

  export default AuthContextProvider;