import { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

const ResetPassword = () => {
  const [resetObj, setResetObj] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setResetObj({ ...resetObj, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBcTzMy6yeRL1-JVvi7Rse7eIBsR1Q1mes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: resetObj.email,
          }),
        }
      );
      if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.error.message);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>EnterEmail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={changeHandler}
              />
            </Form.Group>
            
            <Button type="submit">Send verification Link</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
