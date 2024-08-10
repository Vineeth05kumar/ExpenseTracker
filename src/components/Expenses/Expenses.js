import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useEffect, useState } from "react";

export default function Expenses() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const saveHandler = (obj) => {
    if (isEditing) {
      // Update the existing item in the list
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.dataId === obj.dataId ? obj : item
        )
      );
    } else {
      // Add the new item to the list
      setItems((prevItems) => [...prevItems, obj]);
    }
    setIsEditing(false); // Reset editing state
    setEditingItem(null); // Clear the editing item
  };

  const deleteHandler = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.dataId !== id)); // Remove the deleted item from the state
  };

  const editHandler = (item) => {
    setIsEditing(true);
    setEditingItem(item);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/expenseitems"
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <ExpenseForm
        onSave={saveHandler}
        itemToEdit={editingItem}
        editState={isEditing}
        setEditState={setIsEditing}
      />
      <ExpenseList items={items} onDelete={deleteHandler} onEdit={editHandler} />
    </>
  );
}
