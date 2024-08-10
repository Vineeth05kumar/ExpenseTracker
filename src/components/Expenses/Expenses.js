import ExpenseForm from "./ExpenseForm";
import ExpenseList from './ExpenseList';
import { useEffect, useState } from "react";



export default function Expenses () {
    const [items,setItems] = useState([]);
   
    const saveHandler =(obj) =>{
        setItems((prevItems)=>[...prevItems,obj]);
        
    }

    useEffect(() =>{
        const storedItems = async () =>{
            try {
                const response = await fetch('https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/expenseitems');
                const data = await response.json();
                setItems(data);
            }
            catch (error) {
                console.error(error);
            }

        };
        storedItems();
    },[])

    return(
        <>
        <ExpenseForm onSave={saveHandler} />
        <ExpenseList items={items}/>
        </>
    )
}