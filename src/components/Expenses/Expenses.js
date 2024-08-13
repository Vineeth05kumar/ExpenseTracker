import { useDispatch, useSelector } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useEffect } from "react";
import { expensesActions } from "../store/expensesSlice";
import { themeActions } from "../store/themeSlice";
import { Container, Button } from "react-bootstrap";
import './Expenses.css';

export default function Expenses() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.expenses.items);
  const editStatus = useSelector((state) => state.expenses.editStatus);
  const editingItem = useSelector((state) => state.expenses.editingItem);
  const themeStatus = useSelector((state) => state.theme.themeStatus);
  const totalExpenses = items.reduce((acc, item) => acc + Number(item.amount), 0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/expenseitems"
        );
        const data = await response.json();
        dispatch(expensesActions.saveItems(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, [dispatch]);

  const saveHandler = (obj) => {
    if (editStatus) {
      dispatch(expensesActions.editItem(obj));
      dispatch(expensesActions.setEditStatus(false));
    } else {
      dispatch(expensesActions.addItem(obj));
    }
  };

  const deleteHandler = (id) => {
    dispatch(expensesActions.deleteItem(id));
  };

  const editHandler = (item) => {
    dispatch(expensesActions.setEditStatus(true));
    dispatch(expensesActions.setEditingItem(item));
  };

  const activatePremiumHandler = () => {
    dispatch(themeActions.changeTheme());
  };

  const downloadCSV = () => {
    const csvContent = items
      .map((item) => `${item.catagory},${item.description},${item.amount}`)
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className={themeStatus ? "dark-theme" : ""}>
      <ExpenseForm
        onSave={saveHandler}
        editState={editStatus}
        itemToEdit={editingItem}
      />
      <ExpenseList
        items={items}
        onDelete={deleteHandler}
        onEdit={editHandler}
      />
      { totalExpenses > 10000 && (
        <>
          <Button onClick={activatePremiumHandler} >Activate Premium</Button>
          <Button onClick={downloadCSV} className="ms-2">
            Download Expenses as CSV
          </Button>
        </>
      )}
      <Button onClick={() => dispatch(themeActions.changeTheme())}>
        Toggle Theme
      </Button>
    </Container>
  );
}
