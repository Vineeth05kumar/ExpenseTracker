import { Form, Button, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function ExpenseForm(props) {
  const [expenseObj, setExpenseObj] = useState({
    amount: "",
    description: "",
    catagory: "",
  });

  useEffect(() => {
    if (props.editState && props.itemToEdit) {
      setExpenseObj({
        amount: props.itemToEdit.amount,
        description: props.itemToEdit.description,
        catagory: props.itemToEdit.catagory,
      });
    }
  }, [props.editState, props.itemToEdit]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setExpenseObj({ ...expenseObj, [name]: value });
  };

  const submitExpense = async (e) => {
    e.preventDefault();
    const url = props.editState
      ? `https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/expenseitems/${props.itemToEdit.dataId}`
      : "https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/expenseitems";

    const method = props.editState ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseObj),
      });

      if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.error.message);
      }

      const data = await response.json();
      console.log(data);
      props.onSave({ ...data, Id: props.itemToEdit.dataId });

      setExpenseObj({ amount: "", description: "", catagory: "" }); // Reset the form
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={submitExpense}>
      <Form.Group as={Col} controlId="formBasicExpense" className="mb-3">
        <Form.Label>Expense Amount</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          value={expenseObj.amount}
          onChange={inputHandler}
          placeholder="Enter Amount"
        />
      </Form.Group>
      <Form.Group as={Col} controlId="formBasicExpense" className="mb-3">
        <Form.Label>Expense Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={expenseObj.description}
          onChange={inputHandler}
          placeholder="Enter Description"
        />
      </Form.Group>
      <Form.Select
        aria-label="Default select example"
        value={expenseObj.catagory}
        onChange={inputHandler}
        name="catagory"
        className="mb-4"
      >
        <option>Category</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="education">Education</option>
        <option value="misc">Miscellaneous</option>
        <option value="clothes">Clothes</option>
        <option value="fuel">Fuel</option>
      </Form.Select>
      <Button type="submit" className="mb-3">
        {props.editState ? "Edit Expense" : "Add Expense"}
      </Button>
    </Form>
  );
}