import Signup from "./components/Pages/Signup";
import React,{useEffect} from "react";
import { authActions } from "./components/store/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import Header from "./components/Pages/Header";
import Details from "./components/Pages/Details";
import ResetPassword from "./components/Pages/ResetPassword";
import Expenses from "./components/Expenses/Expenses";
import { useDispatch } from "react-redux";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.setLoginFromLocalStorage());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} /> 
        <Route path="/details" element={<Details />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/expenseform" element={<Expenses />}/>
      </Routes>
    </Router>
  );
}

export default App;