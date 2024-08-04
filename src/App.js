import Signup from "./components/Pages/Signup";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";

function App() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/welcome' element ={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
