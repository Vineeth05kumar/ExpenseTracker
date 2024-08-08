import { Card, Form, Container, Row,Col,Button } from "react-bootstrap";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const passwordReset = () =>{
      navigate('/resetPassword')
    }
    const[formData,setFormData] = useState({
        email:'',
        password:'',
        confirmPassword:''
    })
    const[signup,setSignup] = useState(false);

    const changeHandler = (e) =>{
        const{name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
        });
    };

    const submitHandler = async (e) =>{
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            alert('Password and Confirm Password should be same');
            return;
        }
        let url='';
        if(signup){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcTzMy6yeRL1-JVvi7Rse7eIBsR1Q1mes";
        }
        else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcTzMy6yeRL1-JVvi7Rse7eIBsR1Q1mes'
        }
        try{
            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({
                    email: formData.email,
                    password:formData.password,
                    returnSecureToken: true
                })
            })
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
            const data =await response.json();
            console.log(data);
            localStorage.setItem('token',data.idToken);
            navigate('/expenseform');
            alert("Signup Sucesseful")
        }
        catch(error){
            console.error(error);
            alert(error.message)
        }
    }

    const changeState = () =>{
        setSignup(!signup);
    }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={3}>
          <Card>
            <Card.Header>{signup ?  'SignUp' : 'login'}</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control name='email' value={formData.email} type="email" placeholder="Enter Email" onChange={changeHandler} required/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name='password' value={formData.password}type="password" placeholder="Enter Password"onChange={changeHandler} required/>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control name='confirmPassword' value={formData.confirmPassword} type="password" placeholder="Enter Password" onChange={changeHandler}required/>
                </Form.Group>
                <Button type="submit">{signup ? 'SignUp' : 'Login'}</Button>
              </Form>
              <Card.Footer><Button variant="link" onClick={changeState}>{signup ?  'Have An Account please login' :'Create New Account'   } </Button></Card.Footer>
              <Card.Footer><Button variant="link" onClick={passwordReset}>Forgot Password</Button></Card.Footer>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
