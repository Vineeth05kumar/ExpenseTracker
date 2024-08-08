import ExpenseForm from "./ExpenseForm";
import ExpenseList from './ExpenseList';
import { useState } from "react";



export default function Expenses () {
    const [items,setItems] = useState([]);

    const saveHandler =(obj) =>{
        setItems([...items,obj]);
    }

    return(
        <>
        <ExpenseForm onSave={saveHandler} />
        <ExpenseList items={items}/>
        </>
    )
}