import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  editStatus: false,
  editingItem: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    saveItems(state, action) {
      state.items = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    editItem(state, action) {
      const index = state.items.findIndex((item) => item.dataId === action.payload.dataId);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      // state.editStatus = false;
    },
    deleteItem(state, action) {
      state.items = state.items.filter((item) => item.dataId !== action.payload);
    },
    setEditStatus(state, action) {
      state.editStatus = action.payload;
    },
    setEditingItem(state, action) {
      state.editingItem = action.payload;
    },
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;