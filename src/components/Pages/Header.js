import { Container, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loginStatus && <Nav.Link href="/welcome">Welcome</Nav.Link>}
            {!loginStatus && <Nav.Link href="/login">Login</Nav.Link>}
            {loginStatus && <Nav.Link href="/expenseform">Expenses</Nav.Link>}
          </Nav>
        </Navbar.Collapse>

        {loginStatus && <Button onClick={logoutHandler}>Logout</Button>}
      </Container>
    </Navbar>
  );
}

export default Header;
