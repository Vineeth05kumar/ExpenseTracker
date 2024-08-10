import { Container, ListGroup, Badge, Button } from "react-bootstrap";

export default function ExpenseList(props) {
  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/expenseitems/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        props.onDelete(id); // Call the onDelete function from the parent component to update the state
      } else {
        console.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      {props.items.map((item) => {
        return (
          <ListGroup as="ol" numbered>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.catagory}</div>
                {item.description}
              </div>
              <Badge bg="primary">
                {item.amount}
              </Badge>
              <Button onClick={() => deleteItem(item.dataId)}>Delete</Button>
            </ListGroup.Item>
          </ListGroup>
        );
      })}
    </Container>
  );
}
