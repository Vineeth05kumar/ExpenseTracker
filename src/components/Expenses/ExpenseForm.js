import { Form, Button,  Col } from "react-bootstrap";
import { useState } from "react";

export default function ExpenseForm(props) {
    const [expenseObj,setExpenseObj] = useState({
        amount:'',
        description:'',
        catagory:''
    })

    const inputHandler = (e) =>{
        const {name,value} = e.target;
        setExpenseObj({...expenseObj,[name] : value});
    }

    const submitExpense =(e)=>{
        e.preventDefault();
        console.log(expenseObj);
        props.onSave(expenseObj);
    }
  return (
    <Form onSubmit={submitExpense}>
      <Form.Group as={Col} controlId="formBasicExpense" className="mb-3">
        <Form.Label>Expense Amount</Form.Label>
        <Form.Control type="number" name='amount' value={expenseObj.amount} onChange={inputHandler} placeholder="Enter Amount" />
      </Form.Group>
      <Form.Group as={Col} controlId="formBasicExpense" className="mb-3">
        <Form.Label>Expense Description</Form.Label>
        <Form.Control type="text"  name='description' value={expenseObj.description}onChange={inputHandler} placeholder="Enter Description" />
      </Form.Group>
      <Form.Select aria-label="Default select example"  value={expenseObj.catagory}onChange={inputHandler} name='catagory'className="mb-4">
        <option>Catagory</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="education">Education</option>
        <option value="education">Misc..</option>
        <option value="clothes">Clothes</option>
        <option value="fuel">Fuel</option>
      </Form.Select>
      <Button type='submit' className="mb-3">
        Add Expense
      </Button>
    </Form>
  );
}
