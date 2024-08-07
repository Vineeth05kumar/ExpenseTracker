import Signup from "./components/Pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import Header from "./components/Pages/Header";
import Details from "./components/Pages/Details";
import ResetPassword from "./components/Pages/ResetPassword";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/details" element={<Details />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
