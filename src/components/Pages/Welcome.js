import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Welcome() {
    

    const navigate = useNavigate();
    const changePage = () =>{
        navigate('/details')
    }
  return (
    <Container>
      <h1>Welcome inside expense tracker</h1>

      <h4>
        Your Profile is Incomplete
        <Button varient="link" onClick={changePage}>Click to complete</Button>
      </h4>
    </Container>
  );
}
