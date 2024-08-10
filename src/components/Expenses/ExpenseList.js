import { Container, ListGroup,Badge } from "react-bootstrap";

export default function ExpenseList(props) {
  return (
    <Container>
      {props.items.map((item) => {
        return (
<ListGroup as="ol" numbered >
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.catagory}</div>
                {item.description}
              </div>
              <Badge bg="primary" pill>
                {item.amount}
              </Badge>
            </ListGroup.Item>          
          </ListGroup>
        );
      })}
    </Container>
  );
}
