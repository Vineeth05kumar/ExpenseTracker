import { Button, Container} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const emailVerifyHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBcTzMy6yeRL1-JVvi7Rse7eIBsR1Q1mes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const changePage = () => {
    navigate("/details");
  };

  return (
    <Container>
      <h1>Welcome inside expense tracker</h1>

      <h4>
        Your Profile is Incomplete
        <Button variant="link" onClick={changePage}>
          Click to complete
        </Button>
      </h4>
      <Button variant="danger" onClick={emailVerifyHandler}>
        Verify Email
      </Button>
    </Container>
  );
}
