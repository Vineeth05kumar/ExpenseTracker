import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expensesSlice";


export default function Expenses() {
  const items = useSelector((state) => state.expenses.items);
  const dispatch = useDispatch();

  const saveHandler = (obj) => {
    dispatch(expensesActions.addExpense(obj));
  };

  const deleteHandler = (id) => {
    dispatch(expensesActions.deleteExpense(id));
  };

  const editHandler = (item) => {
    dispatch(expensesActions.editExpense(item));
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/expenseitems"
        );
        const data = await response.json();
        dispatch(expensesActions.setExpenses(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, [dispatch]);

  return (
    <>
      <ExpenseForm
        onSave={saveHandler}
      />
      <ExpenseList items={items} onDelete={deleteHandler} onEdit={editHandler} />
      {items.reduce((acc, item) => acc + Number(item.amount), 0) > 10000 && (
        <button>Activate Premium</button>
      )}
    </>
  );
}
