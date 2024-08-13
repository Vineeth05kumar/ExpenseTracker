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
        console.log("Expense successfully deleted");
        props.onDelete(id); // Remove the deleted item from the list
      } else {
        console.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = (item) => {
    props.onEdit(item); // Pass the item to the parent component to handle editing
  };

  return (
    <Container>
      <ListGroup as="ol" numbered className="mb-3">
        {props.items.map((item) => (
          <ListGroup.Item
            key={item.dataId}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.catagory}</div>
              {item.description}
            </div>
            <Badge bg="primary">{item.amount}</Badge>
            <Button onClick={() => editItem(item)} className="me-2">
              Edit
            </Button>
            <Button onClick={() => deleteItem(item.dataId)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
